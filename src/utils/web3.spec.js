import { ethers } from 'ethers'
import { getSigner } from './web3'

jest.mock('ethers')

describe('Web3 Utils', () => {

    it('getSigner returns provider for signed user using BrowserProvider', async () => {
        ethers.BrowserProvider.mockImplementation(() => { return { getSigner: jest.fn().mockResolvedValue('signer') } })
        const signer = await getSigner()
        expect(signer).toEqual('signer')
    })

    it('getSigner returns default modal provider for non-signed user using JsonRpcProvider', async () => {
        ethers.BrowserProvider.mockImplementation(() => { return { getSigner: jest.fn().mockRejectedValue(new Error('Error')) }})
        ethers.JsonRpcProvider.mockImplementation(() => { return 'signer'  })
        const signer = await getSigner()
        expect(signer).toBeTruthy()
    })
})