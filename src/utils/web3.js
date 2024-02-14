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
    let signer
    try {
        // Signed users
        const wallet = window?.modal?.getWalletProvider()
        const provider = new BrowserProvider(wallet)
        signer = await provider.getSigner()
        console.log(`getSigner ${signer}`)
    } catch (e) {
        console.log(`User is not signed in, errror ${e}, using defaultProvider`)
        // Default modal users
        const url = window?.modal?.options?.defaultChain[0].rpcUrl
        console.log(url)
        signer = new JsonRpcProvider(url)
    }
    return signer
}
