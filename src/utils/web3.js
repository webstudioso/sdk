import { ethers } from 'ethers'

const {
    BrowserProvider
} = ethers

export const getSigner = async () => {
    const wallet = window?.modal?.getWalletProvider()
    const provider = new BrowserProvider(wallet)
    return await provider.getSigner()
}
