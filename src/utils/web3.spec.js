import { ethers } from 'ethers'
import { getSigner } from './web3'

jest.mock('ethers')

describe('Web3 Utils', () => {

    it('getSigner', async () => {
        ethers.BrowserProvider.mockImplementation(() => { return { getSigner: jest.fn().mockResolvedValue('signer') } })
        const signer = await getSigner()
        expect(signer).toEqual('signer')
    })
})