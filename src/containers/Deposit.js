import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TransactionStep from '../components/TransactionStep';

function mapStateToProps(state){
    return {
        // waiting: state.account.waiting,
        steps: state.transaction.steps,
        curStep: state.transaction.curStep
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goto: () => dispatch(push('/account'))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionStep)
