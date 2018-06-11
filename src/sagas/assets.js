import { put, takeEvery, all ,take} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

function* getAssetsAsync(params) {
	let categories = yield axios({
        method: 'get',
        url: 'http://dev.msan.cn:9000/api/asset_categories'
    })

    let categoriesUrls = [];
    let assets = [];
    for(let value of categories.data){
    	if(!value.hidden)categoriesUrls.push(value.address)
    }

	for(let value of categoriesUrls){	
    	let asset = yield axios({
	        method: 'get',
	        url: 'http://dev.msan.cn:9000/api/asset_list/'+value
	    })
	    assets = assets.concat(asset['data']['assets'])
    }

    yield put({
	  type: 'ASSETS_RECEIVED',
	  results: assets
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