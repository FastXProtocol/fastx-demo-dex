export const getBalance = () => {
  return {
    type: "GET_BALANCE"
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

export const setSellEnd = (e, target) => {
  return {
    type: "SET_SELL_END",
    end: target && target.value
  };
}

export const setSellCategroy = (e, target) => {
  return {
    type: "SET_SELL_CATEGROY",
    categroy: target && target.value
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

export const setDepositPrice = (e, target) => {
  return {
    type: "SET_DEPOSIT_PRICE",
    depositPrice: target && target.value
  };
}

export const deposit = (depositPrice) => {
  return {
    type: "DEPOSIT",
    depositPrice
  };
}