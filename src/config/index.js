export let chainOptions = {
    debug: true
}

export let chainCategory = ""

if (process.env.ENV.toLowerCase() === "local") {
    chainOptions = {
        ...chainOptions,
        gethRpc: "http://localhost:8545",
        fastXRpc: "http://localhost:8546/jsonrpc",
        rootChainAddress: "0xA3B2a1804203b75b494028966C0f62e677447A39",
        fexContractAddress: "0x395B650707cAA0d300615bBa2901398DFf64CF7c"
    }

    chainCategory = "0xd641205E8F36A858c5867945782C917E3F63d1e8"
} else {
    chainOptions = {
        ...chainOptions,
        gethRpc: "http://localhost:8545",
        fastXRpc: "http://localhost:8546/jsonrpc",
        rootChainAddress: "0x15AB8DFbb99D72423eb618591836689a5E87dC7a",
    }

    chainCategory = "0x952CE607bD9ab82e920510b2375cbaD234d28c8F"
}

export const retry = {
	count: 5,
	time: 1000
}

export const tokensOptions = [
    { key: 'ETH', text: 'ETH', value: 'ETH' },
    { key: 'FEX', text: 'FEX', value: 'FEX' },
]

export const network = {
    'Offline': { rpc: 'offline', tx_explorer: null },
    'Local RPC': { rpc: 'http://127.0.0.1:8545', tx_explorer: null },
    'Ropsten Testnet': { rpc: 'https://ropsten.infura.io/GjiCzFxpQAUkPtDUpKEP', tx_explorer: 'https://ropsten.etherscan.io/tx/' },
    'Main Net': { rpc: 'https://mainnet.infura.io/GjiCzFxpQAUkPtDUpKEP', tx_explorer: 'https://etherscan.io/tx/' }
}

//去除eth
export const tokenToAddressMap = {
    'fex': '0x395B650707cAA0d300615bBa2901398DFf64CF7c'
}

//全小写
export const contractToTokenMap = {
    '0000000000000000000000000000000000000000': 'eth',
    '395b650707caa0d300615bba2901398dff64cf7c': 'fex'
}

export const serverUrl = window.location.protocol+'//'+window.location.hostname+':3001/api/';