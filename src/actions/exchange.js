export const pickToken = (tokenType) => {
    return {
      type: "PICKTOKEN",
      tokenType
    };
}

export const closeTokenSelector = () => {
    return {
      type: "CLOSE_TOKEN_SELECTOR"
    };
}

export const setSelectedSide = (side, token) => {
    return {
        type: "SET_SELECTED_SIDE",
        side, 
        token,
    }
}

export const swapTokens = () => {
    return {
        type: "SWAP_TOKENS",
    }
}

export const setBuyAmount = (amount) => {
    return {
        type: "SET_BUY_AMOUNT",
        amount
    }
}

export const setPayAmount = (amount) => {
    return {
        type: "SET_PAY_AMOUNT",
        amount
    }
}

export const nextStep = () => {
    return {
        type: "NEXT_STEP"
    }
}

export const reset = () => {
    return {
        type: "RESET"
    }
}

export const getExchangeRate = (amount) => {
    return {
        type: "GET_EXCHANGE_RATE",
        amount
    }
}

export const transaction = (amount) => {
    return {
        type: "TRANSACTION",
        amount
    }
}

export const transactionChange = (transaction) => {
    return {
        type: "TRANSACTION_RECEIVED",
        transaction
    }
}

export const transactionStausChange = (status) => {
    return {
        type: "TRANSACTION_STATUS_CHANGE",
        status
    }
}