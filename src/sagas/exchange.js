import { put, takeLatest, take} from 'redux-saga/effects';
import { delay, channel} from 'redux-saga';
import { chainOptions} from '../config';
import moment from 'moment';
import axios from 'axios';

import {
    setFastx
  } from '../actions/app'

let store, fastx;

async function getFastx() {
    while(!fastx) {
        fastx = store.getState().app.fastx;
        await delay(200);
    }

    return true;
}

async function getAccount() {
    await getFastx();
    let accounts = [];
    try {
        accounts = await fastx.web3.eth.getAccounts();
    }catch(err){
        throw new Error('getAccount request failed');
    }

    //使用本地钱包时不在getAccountAsync内更新defaultAccount
    if(!fastx.defaultAccount && typeof window.Web3 !== 'undefined')
        fastx.defaultAccount = accounts[0];
    console.log('getAccountAddress:',fastx.defaultAccount);
    await put({
      type: 'ACCOUNT_RECEIVED',
      ownerAddress: fastx.defaultAccount
    })
    await put(setFastx(fastx));
}

const getUTXOs = async (address) => {
    return (await fastx.getAllUTXO(address)).data.result;
};

const getFromUTXO = async(fromAmount) => {
    console.group('getFromUTXO')
    console.log(fastx.defaultAccount)
    const utxos = await getUTXOs(fastx.defaultAccount);
    console.log(utxos)
    for(const utxo of utxos){
        const [blknum, txindex, oindex, contractAddress, amount, tokenid] = utxo;
        if(contractAddress == "0000000000000000000000000000000000000000" && amount == fromAmount) {
            return utxo
        }
    }
    console.groupEnd()
    return null;
}

const logBalance = async () => {
    console.group('logBalance')
    console.log("\naddress: ", fastx.defaultAccount);
    console.log("ethBalance: ", await fastx.getTokenBalance(fastx.defaultAccount));
    let utxos = (await fastx.getAllUTXO(fastx.defaultAccount)).data.result;
    console.log('\n', utxos);
    console.groupEnd()
}

const transactionTx = async(action) => {
    console.group('transactionTx')
    const tAmount = parseFloat(await fastx.web3.utils.toWei((action.amount+''), 'ether'));
    console.log("tAmount", tAmount);
    let psTx = await fastx.createExchangePartiallySignedTransaction('0x0',chainOptions.fexContractAddress,tAmount)
    if(psTx){
        psTx = psTx.data.result;
        let fromUTXO = await fastx.getOrNewUtxo(tAmount, {from:fastx.defaultAccount});
        if(!fromUTXO){
            alert("You don't have enough ETH in FastX");
            console.groupEnd()
            return [];
            // await fastx.deposit("0x0", tAmount, 0, {from: fastx.defaultAccount});
            // await delay(1000);
            // fromUTXO = await getFromUTXO(tAmount);
        }
        console.log("fromUTXO", fromUTXO);
        const [blknum, txindex, oindex, contractAddress, amount, tokenid] = fromUTXO;
        logBalance()
        await fastx.sendPsTransactionFill(psTx, blknum, txindex, oindex, fastx.defaultAccount, fastx.defaultAccount);
        logBalance()
        let transaction = store.getState().exchange.transaction;
        transaction.push({
            eth: action.amount,
            fastx: action.amount*10
        })
        console.groupEnd()
        return transaction
    }else{
        console.error("no psTx")
        console.groupEnd()
        return [];
    }
}

function* getExchangeRateAsync(action) {
    yield getFastx()
    let rate = yield fastx.getExchangeRate('0x0',chainOptions.fexContractAddress,action.amount)

    yield put({
      type: 'EXCHANGE_RATE_RECEIVED',
      rate: rate
    })
}

function* transactionAsync(action) {
    console.group('saga_exchange_transactionAsync')
    yield getAccount()
    let transaction
    try{
        transaction = yield transactionTx(action)
    }catch(err){
        console.error(err)
        alert(err)
    }finally{
        yield put({
            type: 'GET_BALANCE'
        })
        yield put({
            type: 'TRANSACTION_RECEIVED',
            transaction: transaction,
        })
        yield put({
            type: 'TRANSACTION_STATUS_CHANGE',
            status: false,
        })
        console.groupEnd()
    }
}

export default function * exchangeSaga (arg) {
    store = arg;
    yield takeLatest('GET_EXCHANGE_RATE', getExchangeRateAsync)
    yield takeLatest('TRANSACTION', transactionAsync)
}