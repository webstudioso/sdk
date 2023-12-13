
import utils from './utils';
import constants from './constant';
import abi from './abi.json';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { ethers } from 'ethers';

const webstudio = {
	utils,
	constants,
	abi,
	ethers,
	web3Modal: {
		createWeb3Modal,
		defaultConfig
	}
}

window.webstudio = webstudio

export default webstudio

console.log("Webstudio bundle loaded...") 
