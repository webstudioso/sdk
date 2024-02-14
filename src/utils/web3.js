import { ethers } from 'ethers'

const {
    BrowserProvider,
    JsonRpcProvider
} = ethers

/**
 * Uses current signed in user. Used for both read/write operations
 * @returns Provider used for signing contract calls
 */
export const getSigner = async () => {
    const wallet = window?.modal?.getWalletProvider()
    const provider = new BrowserProvider(wallet)
    return await provider.getSigner()
}

/**
 * Uses default configured provider rpc url for read only.
 * Uses data from web3modal block on studio
 */
export const getDefaultJsonRPCProvider = () => {
    const url = window?.modal?.options?.defaultChain[0].rpcUrl
    const provider = new JsonRpcProvider(url)
    return provider
}