export let chainOptions = {
    debug: true
}

export let chainCategory = ""

console.log(process.env.ENV);
if (process.env.ENV.toLowerCase() === "local") {
    chainOptions = {
        ...chainOptions,
        gethRpc: "http://localhost:8545",
        fastXRpc: "http://localhost:8546/jsonrpc",
        rootChainAddress: "0xA3B2a1804203b75b494028966C0f62e677447A39",
        erc20ContractAddress: "0x395B650707cAA0d300615bBa2901398DFf64CF7c"
    }

    chainCategory = "0xd641205E8F36A858c5867945782C917E3F63d1e8"
} else {
    chainOptions = {
        ...chainOptions,
        gethRpc: "http://localhost:8545",
        fastXRpc: "http://fastx-rinkeby.msan.cn/jsonrpc",
        rootChainAddress: "0xffc5DE2513F5F256dB660CDd566D6C54fBa90405",
    }

    chainCategory = "0x952CE607bD9ab82e920510b2375cbaD234d28c8F"
}

export const retry = {
	count: 5,
	time: 1000
}

export const tokensOptions = [
    { key: 'ETH', text: 'ETH', value: 'ETH' },
    { key: 'fastx', text: 'fastx', value: 'fastx' },
]

export const network = {
    'Offline': { rpc: 'offline', tx_explorer: null },
    'Local RPC': { rpc: 'http://127.0.0.1:8545', tx_explorer: null },
    'Ropsten Testnet': { rpc: 'https://ropsten.infura.io/GjiCzFxpQAUkPtDUpKEP', tx_explorer: 'https://ropsten.etherscan.io/tx/' },
    'Main Net': { rpc: 'https://mainnet.infura.io/GjiCzFxpQAUkPtDUpKEP', tx_explorer: 'https://etherscan.io/tx/' }
}
