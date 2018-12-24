import { put, takeLatest, take} from 'redux-saga/effects';
import { delay, channel} from 'redux-saga';
import { chainOptions, serverUrl} from '../config';
import moment from 'moment';
import axios from 'axios';
import request from '../utils/request'

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
    let props = store.getState().exchange
    let contractAddress1,contractAddress2
    for(let token of props.receivedTokens){
        if(props.from == token.symbol.toLocaleLowerCase()) 
            contractAddress1 = token.contractAddress
        if(props.to == token.symbol.toLocaleLowerCase()) 
            contractAddress2 = token.contractAddress
    }

    let data = {
        amount: tAmount,
        contractAddress1,
        contractAddress2
    }

    let offerPsTx = await request(serverUrl+'offerPsTx', {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
    })
    console.log("offerPsTx", offerPsTx);
    if(offerPsTx){
        let transaction = store.getState().exchange.transaction;
        try{
            const fillUtxo = await fastx.getOrNewUtxo(tAmount, contractAddress1);
            console.log("fillUtxo", fillUtxo);
           
            const [fillBlknum, fillTxindex, fillOindex, fillContractAddress, fillAmount, fillTokenid] = fillUtxo;
            console.log('...')
            const result = (await fastx.sendPsTransactionFill(
                offerPsTx,
                fillBlknum, fillTxindex, fillOindex,
                fastx.defaultAccount, fastx.defaultAccount)).data
            console.log(result);
            if(result.error){
                alert(result.error.data.message)
            }else{
                transaction.push({
                    'spend':[props.from, action.amount],
                    'bought':[props.to,action.amount*props.rate]  
                })
            } 
        }catch(err){
            console.error(err)
        }finally{
            console.groupEnd()
            return transaction
        }  
    }else{
        console.error("no offerPsTx")
        console.groupEnd()
        return [];
    }
}

function* getExchangeRateAsync(action) {
    let props = store.getState().exchange
    yield put({
      type: 'EXCHANGE_RATE_RECEIVED',
      rate: null,
      token1: 'NA',
      token2: 'NA'
    })
    console.log(props)
    for(let v of props.transactionPair){
        if(v.sell.toLocaleLowerCase() == props.from && v.buy.toLocaleLowerCase() == props.to){
            yield put({
                type: 'EXCHANGE_RATE_RECEIVED',
                rate: v.rate/100,
                token1: v.sell,
                token2: v.buy
            })
        }
    }
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
    yield takeLatest('SWAP_TOKENS', getExchangeRateAsync)
    yield takeLatest('SET_SELECTED_SIDE', getExchangeRateAsync)
    yield takeLatest('TRANSACTION', transactionAsync)
}