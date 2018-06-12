export const getAssets = () => {
  return {
    type: "GET_ASSETS"
  };
}

export const getAssetDetail = (id) => {
  return {
    type: "GET_ASSET_DETAIL",
    id
  };
}

export const assetsReceived = (results) => {
  return {
    type: "ASSETS_RECEIVED",
    results: results
  }
}

export const setAssetsFilter = (e, target) => {
  return {
    type: "SET_ASSETS_FILTER",
    filter: target && target.value
  };
}

export const assetsSearch = (e, target) => {
  return {
    type: "ASSETS_SEARCH",
    search: target && target.value
  };
}

export const assetBuy = (category, id, fillTx) => {
  return {
    type: "ASSETS_BUY",
    category,
    id,
    fillTx
  };
}