import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import * as UAuthWeb3Modal from '@uauth/web3modal';
import UAuthSPA from '@uauth/js';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import utils from './utils';
import constants from './constant';
import abi from './abi.json';

const webstudio = {
	ThirdwebSDK,
	UAuthWeb3Modal,
	UAuthSPA,
	WalletConnectProvider,
	Web3Modal,
	utils,
	constants,
	abi
}

window.webstudio = webstudio

export default webstudio

console.log("Webstudio bundle loaded...") 
