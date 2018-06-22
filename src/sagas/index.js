import { put, takeEvery, all, fork } from 'redux-saga/effects';
import accountSaga from './account';
import assetSaga from './assets';

export default function* rootSaga() {
  yield all([
  	fork(accountSaga),
    fork(assetSaga)
  ])
}