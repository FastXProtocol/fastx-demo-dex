import { all, fork } from 'redux-saga/effects';
import accountSaga from './account';
import assetSaga from './assets';
import modalSaga from './modal';
import networkSaga from './network';

export default function* rootSaga(store) {
  yield all([
  	fork(accountSaga, store),
    fork(assetSaga, store),
    fork(modalSaga, store),
    fork(networkSaga, store)
  ])
}
