import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TransactionStep from '../components/TransactionStep';

function mapStateToProps(state){
    return {
        waiting: state.account.waiting
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
