export const getBalance = () => {
  return {
    type: "GET_BALANCE"
  };
}

export const getReviewAssets = () => {
    return {
        type: "GET_REVIEW_ASSETS"
    };
}

export const getAccount = () => {
  return {
    type: "GET_ACCOUNT"
  };
}

export const sellAsset = (params) => {
  return {
    type: "SELL_ASSET",
    params
  };
}

export const sellContractAsset = (params) => {
  return {
    type: "SELL_CONTRACT_ASSET",
    params
  };
}

export const setSellEnd = (end) => {
  return {
    type: "SET_SELL_END",
    end
  };
}

export const setSellcategory = (e, target) => {
  return {
    type: "SET_SELL_category",
    category: target && target.value
  };
}

export const setSellId = (e, target) => {
	return {
    type: "SET_SELL_ID",
    sellId: target && target.value
  };
}

export const setSellPrice = (e, target) => {
	return {
    type: "SET_SELL_PRICE",
    sellPrice: target && target.value
  };
}

export const setWithdrawalPrice = (e, target) => {
  return {
    type: "SET_WITHDRAWAL_PRICE",
    withdrawalPrice: target && target.value
  };
}

export const setWithdrawalUnit = (e, target) => {
  return {
    type: "SET_WITHDRAWAL_UNIT",
    withdrawalUnit: target && target.value
  };
}

export const setDepositPrice = (e, target) => {
  return {
    type: "SET_DEPOSIT_PRICE",
    depositPrice: target && target.value
  };
}

export const setDepositUnit = (e, target) => {
  return {
    type: "SET_DEPOSIT_UNIT",
    depositUnit: target && target.value
  };
}

export const deposit = (depositPrice) => {
  return {
    type: "DEPOSIT",
    depositPrice
  };
}

export const withdrawal = (withdrawalPrice) => {
  return {
    type: "WITHDRAWAL",
    withdrawalPrice
  };
}

export const switchingUnit = (currency, unit) => {
  return {
    type: "SWITCH_UNIT",
    currency
  };
}
