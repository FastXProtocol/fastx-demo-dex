import { put, takeEvery} from 'redux-saga/effects';
let store;

function* modalCloseAsync(action) {
    yield put({
      type: 'TRANSACTION_ERROR',
      transactionErr: ''
    })
}

export default function * modalSaga (arg) {
    store = arg;
    yield takeEvery('CLOSE', modalCloseAsync)
}
