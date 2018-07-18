const CHANGE_FROM = 'CHANGE_FROM'
const CHANGE_AMOUNT = 'CHANGE_AMOUNT'
const CHANGE_TO = 'CHANGE_TO'
const CHANGE_GAS_PRICE = 'CHANGE_GAS_PRICE'
const COMFIRM_SEND_TRANSACTION = 'COMFIRM_SEND_TRANSACTION'
const COMFIRM_SEND_TRANSACTION_SUCCESS = 'COMFIRM_SEND_TRANSACTION_SUCCESS'
const COMFIRM_SEND_TRANSACTION_ERROR = 'COMFIRM_SEND_TRANSACTION_ERROR'
const ABORT_TRANSACTION = 'ABORT_TRANSACTION'
const SEND_TRANSACTION = 'SEND_TRANSACTION'
const SEND_TRANSACTION_SUCCESS = 'SEND_TRANSACTION_SUCCESS'
const SEND_TRANSACTION_ERROR = 'SEND_TRANSACTION_ERROR'

const initialState = {
    from: '',
    to: '',
    amount: 0,
    gasPrice: 10, // gwei
    locked: false,
    comfirmationLoading: false,
    confirmationError: false,
    confirmationMsg: false,
    sendInProgress: false,
    sendError: false,
    sendTx: false,
};

export default function sendToken (state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_FROM:
            return {
                ...state,
                from: action.address
            }
        case CHANGE_AMOUNT:
            return {
                ...state,
                amount: action.amount
            }
        case CHANGE_TO:
            return {
                ...state,
                to: action.address
            }
        case CHANGE_GAS_PRICE:
            return {
                ...state,
                gasPrice: action.gasPrice
            }
        case COMFIRM_SEND_TRANSACTION:
            return {
                ...state,
                comfirmationLoading: true,
                locked: true
            }
        case COMFIRM_SEND_TRANSACTION_SUCCESS:
            return {
                ...state,
                comfirmationLoading: false,
                confirmationMsg: action.msg,
                confirmationError: false
            }
        case COMFIRM_SEND_TRANSACTION_ERROR:
            return {
                ...state,
                comfirmationLoading: false,
                confirmationError: action.error,
                locked: false
            }
        case ABORT_TRANSACTION:
            return {
                ...state,
                comfirmationLoading: false,
                confirmationMsg: false,
                confirmationError: false,
                locked: false,
                sendError: false,
                sendTx: false
            }
        case SEND_TRANSACTION:
            return {
                ...state,
                sendInProgress: true,
                sendError: false,
                sendTx: false
            }
        case SEND_TRANSACTION_SUCCESS:
            return {
                ...state,
                sendInProgress: false,
                sendError: false,
                sendTx: action.tx
            }
        case SEND_TRANSACTION_ERROR:
            return {
                ...state,
                sendInProgress: false,
                sendError: action.error,
                sendTx: false
            }
        default:
            return state;
    }
}
