import { put, takeEvery, all ,take} from 'redux-saga/effects'
import { delay } from 'redux-saga'

function* getAssetsAsync(params) {
	console.log(params)
	yield delay(1000)
    yield put({
	  type: 'ASSETS_RECEIVED',
	  results: [{
	  	id: 7127,
	  	name: "Matthew",
	  	image: "/assets/images/avatar/large/elliot.jpg",
	  	leftTime: "19 hours left",
	  	prePrice: 0.01,
	  	nowPrice: 1.07
	  },{
	  	id: 5127,
	  	name: "ChicMic",
	  	image: "/assets/images/avatar/large/elliot.jpg",
	  	leftTime: "29 hours left",
	  	prePrice: 0.34,
	  	nowPrice: 3.27
	  }]
	})
}

export const watchGetAssetsAsync = function* () {
    yield takeEvery('GET_ASSETS', getAssetsAsync)
}

export const watchSetAssetsFilterAsync = function* () {
    yield takeEvery('SET_ASSETS_FILTER', getAssetsAsync)
}

export const watchSearchAssetsTitleAsync = function* () {
    yield takeEvery('ASSETS_SEARCH', getAssetsAsync)
}