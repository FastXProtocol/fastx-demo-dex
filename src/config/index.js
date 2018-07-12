export let chainOptions = {
    debug: true
}

export let chainCategory = ""

console.log(process.env.ENV);
if (process.env.ENV.toLowerCase() === "local") {
    chainOptions = {
        ...chainOptions,
        gethRpc: "//localhost:8545",
        fastXRpc: "//localhost:8546/jsonrpc",
        rootChainAddress: "0xa3b2a1804203b75b494028966c0f62e677447a39",
    }

    chainCategory = "0xd641205E8F36A858c5867945782C917E3F63d1e8"
} else {
    chainOptions = {
        ...chainOptions,
        gethRpc: "//localhost:8545",
        fastXRpc: "//fastx-rinkeby.msan.cn/jsonrpc",
        rootChainAddress: "0xffc5DE2513F5F256dB660CDd566D6C54fBa90405",
    }

    chainCategory = "0x952CE607bD9ab82e920510b2375cbaD234d28c8F"
}

export const retry = {
	count: 5,
	time: 1000
}

export const network = {
    Offline: { rpc: 'offline', tx_explorer: null },
    'Local RPC': { rpc: 'http://127.0.0.1:8545', tx_explorer: null },
    'Ropsten Testnet': { rpc: 'https://ropsten.infura.io/GjiCzFxpQAUkPtDUpKEP', tx_explorer: 'https://ropsten.etherscan.io/tx/' },
    'Main Net': { rpc: 'https://mainnet.infura.io/GjiCzFxpQAUkPtDUpKEP', tx_explorer: 'https://etherscan.io/tx/' }
}
