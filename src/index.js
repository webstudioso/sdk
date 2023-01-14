import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import * as UAuthWeb3Modal from "@uauth/web3modal";
import UAuthSPA from "@uauth/js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";


window.webstudio = {
	ThirdwebSDK,
	UAuthWeb3Modal,
	UAuthSPA,
	WalletConnectProvider,
	Web3Modal,
}

console.log("Webstudio bundle loaded...") 
