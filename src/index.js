import { createWeb3Modal, defaultConfig } from '@web3modal/ethers'
import { ethers } from 'ethers'
import { getSigner } from './utils/web3'

export const version = process?.env?.npm_package_version

export const webstudio = {
	ethers,
	web3Modal: {
		createWeb3Modal,
		defaultConfig
	},
	version,
	utils: {
		getSigner
	}
}

// Available in window scope for fns and constants
window.webstudio = webstudio

console.log(`Webstudio SDK Ver.${version} loaded...`) 
