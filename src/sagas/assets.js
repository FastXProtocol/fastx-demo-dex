import { put, takeEvery, all ,take} from 'redux-saga/effects'
import client from '../api/plasma_js_client_dev'

function* getAssetsAsync() {
	console.log(client)
    yield put({
	  type: 'ASSETS_RECEIVED',
	  results: [1,2,3]
	})
}

export const watchGetAssetsAsync = function* () {
    yield takeEvery('GET_ASSETS', getAssetsAsync)
}

export const watchSetAssetsFilterAsync = function* () {
    yield takeEvery('SET_ASSETS_FILTER', getAssetsAsync)
}

export const watchSearchAssetsTitleAsync = function* () {
    yield takeEvery('SEARCH_ASSETS_TITLE', getAssetsAsync)
}