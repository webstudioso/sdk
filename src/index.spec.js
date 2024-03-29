import { webstudio } from './index'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers'
import { initializeDatasource } from './modules/datasource'

jest.mock('@web3modal/ethers', () => ({
    createWeb3Modal: jest.fn(),
    defaultConfig: jest.fn()
}))

describe('SDK', () => {

    it('sets items for window access', () => {
        expect(webstudio.ethers).toBeTruthy()
        expect(webstudio.web3Modal.createWeb3Modal).toBeTruthy()
        expect(webstudio.web3Modal.defaultConfig).toBeTruthy()
        expect(webstudio.modules.datasource.initializeDatasource).toBeTruthy()
    })
})