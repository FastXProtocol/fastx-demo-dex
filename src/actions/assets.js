export const getAssets = () => {
  return {
    type: "GET_ASSETS"
  };
}

export const assetsReceived = (results) => {
  return {
    type: "ASSETS_RECEIVED",
    results: results
  }
}

export const setAssetsFilter = (e, target) => {
  console.log(target && target.value)
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