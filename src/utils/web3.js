import { ethers } from 'ethers'

const {
    BrowserProvider,
    getDefaultProvider
} = ethers

/**
 * Uses current signed in user. Used for both read/write operations
 * @returns Provider used for signing contract calls
 */
export const getSigner = async () => {
    let signer, provider
    const wallet = window?.modal?.getWalletProvider()
    console.log(`Wallet Provider ${wallet}`)
    if (wallet) {
        provider = new BrowserProvider(wallet)
        signer = await provider.getSigner()
    } else {
        const network = window?.modal?.options?.defaultChain[0]
        console.log(`Connecting to ${network?.rpcUrl}`)
        signer = getDefaultProvider(network?.rpcUrl)
    }
    console.log(signer)
    return signer
}
