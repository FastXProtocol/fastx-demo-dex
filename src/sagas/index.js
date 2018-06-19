import { put, takeEvery, all, fork } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
  	fork(require('./assets').watchGetAssetsAsync),
  	fork(require('./assets').watchSetAssetsFilterAsync),
  	fork(require('./assets').watchSearchAssetsTitleAsync),
  	fork(require('./assets').watchGetAssetsDetailAsync),
  	fork(require('./assets').watchassetBuyAsync),
    fork(require('./assets').watchPublishStatusAsync),
  	fork(require('./account').watchGetBalanceAsync),
  	fork(require('./account').watchGetAccount),
  	fork(require('./account').watchSellAsset),
    fork(require('./account').watchDeposit),
    fork(require('./account').watchSellContractAsset)
  ])
}