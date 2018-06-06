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

export const setAssetsFilter = (filter) => {
  return {
    type: "SET_ASSETS_FILTER",
    filter: filter
  };
}

export const searchAssetsTitle = (search) => {
  return {
    type: "SEARCH_ASSETS_TITLE",
    search: search
  };
}

