export const resetData = () => {
  return {
    type: "RESET_SEARCH_OPTION",
    results: [],
    value: '',
    isLoading: false
  };
}

export const searchStart = (value) => {
  return {
    type: "SEARCH_START",
    value: value,
    isLoading: true
  };
}

export const searchEnd = (results) => {
  return {
    type: "SEARCH_END",
    results: results,
    isLoading: false
  };
}

export const searchSelected = (value) => {
  return {
    type: "SEARCH_SELECTED",
    value: value
  };
}