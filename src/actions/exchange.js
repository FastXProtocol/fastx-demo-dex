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

export const getExchangeRate = () => {
    return {
        type: "GET_EXCHANGE_RATE"
    }
}

export const transaction = (amount,rate,contractAddress1,contractAddress2) => {
    return {
        type: "TRANSACTION",
        amount,
        rate,
        contractAddress1,
        contractAddress2
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

export const setToekns = (tokens) => {
    return {
        type: "TOKENS_RECEIVED",
        tokens
    }
}

export const setTransactionPair = (tokens) => {
    return {
        type: "TRANSACTION_PAIR_RECEIVED",
        tokens
    }
}

export const changeRate = (rate,token1,token2) => {
    return {
        type: "EXCHANGE_RATE_RECEIVED",
        rate,
        token1,
        token2
    }
}

