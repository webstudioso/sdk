import { ethers } from 'ethers'
import { getSigner } from './web3'

jest.mock('ethers')

describe('Web3 Utils', () => {

    it('getSigner returns provider for signed user using BrowserProvider', async () => {
        global.window.modal = {
            getWalletProvider: jest.fn().mockReturnValue({ data: 1 })
        }
 
        ethers.BrowserProvider.mockImplementation(() => { return { getSigner: jest.fn().mockResolvedValue('signer') } })
        const signer = await getSigner()
        expect(signer).toEqual('signer')
    })

    it('getSigner returns default modal provider for non-signed user using JsonRpcProvider', async () => {
        global.window.modal = {
            getWalletProvider: jest.fn().mockReturnValue(undefined)
        }

        ethers.getDefaultProvider.mockImplementation(() => { return 'signer'  })
        const signer = await getSigner()
        expect(signer).toEqual('signer')
    })
})