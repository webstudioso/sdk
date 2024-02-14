import { ethers } from 'ethers'
import { getDefaultJsonRPCProvider, getSigner } from './web3'

jest.mock('ethers')

describe('Web3 Utils', () => {

    it('getSigner', async () => {
        ethers.BrowserProvider.mockImplementation(() => { return { getSigner: jest.fn().mockResolvedValue('signer') } })
        const signer = await getSigner()
        expect(signer).toEqual('signer')
    })

    it('getDefaultJsonRPCProvider', async () => {
        ethers.JsonRpcProvider.mockImplementation(() => { return 'signer'  })
        const signer = getDefaultJsonRPCProvider()
        expect(signer).toBeTruthy()
    })
})