import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Wallet from '../components/Wallet';

function mapStateToProps(state){
    return {
        fastx: state.app.fastx
    }
}

function mapDispatchToProps(dispatch) {
    return {
        creatWallet: async (fastx) => {
            let wallet = await fastx.web3.eth.accounts.wallet.create(2);
            console.log(wallet)
        },
        setWalletPwd: async (fastx) => {
            let res = await fastx.web3.eth.accounts.wallet.save('abc123')
            console.log(res)
        },
        loginWallet: async (fastx) => {
            let wallet = await fastx.web3.eth.accounts.wallet.load('abc123')
            console.log(wallet)
            let accounts = await fastx.web3.eth.getAccounts()
            console.log(accounts)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wallet)
