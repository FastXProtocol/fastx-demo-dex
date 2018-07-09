import { all, fork } from 'redux-saga/effects';
import accountSaga from './account';
import assetSaga from './assets';

export default function* rootSaga(store) {
  yield all([
  	fork(accountSaga, store),
    fork(assetSaga, store)
  ])
}
