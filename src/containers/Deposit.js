import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import TransactionStep from '../components/TransactionStep';
import * as modalActions from '../actions/modal';

function mapStateToProps(state){
    return {
        steps: state.transaction.steps,
        curStep: state.transaction.curStep,
        error: state.error,
        modal: state.modal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goto: () => dispatch(push('/account')),
        checkError: (error, isOpen) => {
            if(error && error.transactionErr == 'Not enough balance' && !isOpen){
               dispatch(modalActions.open('您的余额不足，请去账户充值'));
            }
        },
        ...bindActionCreators(modalActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionStep)
