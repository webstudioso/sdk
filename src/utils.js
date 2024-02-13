// import constants from './constant'
// import abi from './abi.json'

// const { EVENT, STANDARD, CACHE } = constants

// const getComponent = (id) => {
//     const component = document.getElementById(id)
//     console.debug(`getComponent ${id} ${component}`)
//     return component
// }

// const isEditor = () => {
//     const isEditorView = window.location.href.includes('/e/')
//     console.debug(`isEditor ${isEditorView}`)
//     return isEditorView
// }

// const setComponentText = (id, text) => {
//     const cmp = getComponent(id)
//     cmp.textContent = text
// }

// const show = (id) => {
//     getComponent(id).classList.remove('hidden')
//     console.debug(`component ${id} shown by removing hidden property css`)
// }

// const hide = (id) => {
//     getComponent(id).classList.add('hidden')
//     console.debug(`component ${id} hidden by adding hidden property css`)
// }

// const sendNotification = (alertSeverity, message, link, timeout) => {
//     const detail = { 
//         detail: { 
//             alertSeverity, 
//             message, 
//             link,
//             timeout
//         }
//     };
//     const cEvent = new CustomEvent('onToast', detail)
//     console.debug(`Sending notification of ${alertSeverity} with message ${message} and link ${link} for timeout ${timeout}`)
//     document.dispatchEvent(cEvent)
// }

// const onSuccessMessage = (message, link=null, timeout=5000) => {
//     sendNotification('success', message, link, timeout)
// }

// const onErrorMessage = (message, link=null, timeout=5000) => {
//     sendNotification('error', message, link, timeout)
// }

// const getAccount = () => {
//     console.debug(`Retrieving wallet account from provider ${window.walletProvider}`)
//     const provider = window.walletProvider;
//     if (!provider) return

//     if (provider.accounts && provider.accounts.length > 0)
//       return provider.accounts[0]
    
//     return provider.selectedAddress
// }

// const getProvider = () => {
//     console.debug(`Retrieving web3 provider ${window.walletProvider}`)
//     return new window.ethers.providers.Web3Provider(window.walletProvider)
// }

// const getCachedProvider = () => {
//     return localStorage.getItem(CACHE)
// }


// const getProviderOptions = (infuraId) => {
//     const providerOptions = {
//         walletconnect: {
//             package: window.webstudio.WalletConnectProvider,
//             options: {
//                 infuraId
//             }
//         }
//     }
//     return providerOptions
// }

// const getSigner = () => {
//     const provider = getProvider()
//     const signer = provider.getSigner()
//     console.debug(`Found signer`)
//     console.debug(signer)
//     return signer
// }

// const initComponent = (id, handler=()=>{}) => {
//     if (isEditor()) {
//         console.log(`Listeners cannot be added to component ${id} while in editor mode`)
//         return
//     }
//     document.addEventListener(EVENT.ACCOUNT_CHANGED, handler)
//     document.addEventListener(EVENT.CHAIN_CHANGED, handler)
//     document.addEventListener(EVENT.NETWORK_CHANGED, handler)
//     document.addEventListener(EVENT.CONNECTED, handler)
//     document.addEventListener(EVENT.DISCONNECTED, handler)
//     handler()
// }

// const getContract = (address, abi) => {
//     console.debug(`Retrieving contract for adress ${address} with abi ${JSON.stringify(abi)}`)
//     const contract = new ethers.Contract(address, abi, getSigner())
//     return contract
// }

// const getBalances = ({ address, standard=STANDARD.ERC721, tokenIds=[], handler=()=>{} }) => {
//     console.debug(`Retrieving balances for ${standard} contract ${address} as an array`)
//     const account = getAccount()
//     const contract = getContract(address, abi[standard])
//     switch(standard) {
//         case STANDARD.ERC721:
//             console.debug(`Invoking balanceOf`)
//             contract.balanceOf(account).then((balance) => handler([balance]))
//         break
//         case STANDARD.ERC1155:
//             console.debug(`Invoking balanceOfBatch`)
//             contract.balanceOfBatch([account], tokenIds).then(handler)
//         break;
//         default:
//             handler(null, 'not_supported_standard')
//             console.debug('not_supported_standard')
//     }
// }

// const formatAddress = (address) => {
//     return `${address.slice(0, 6)}...${address.slice(address.length-4, address.length)}`
// }

// const toHex = (input) => {
//     console.debug(`Parsing to hex ${input}`)
//     const parsedValue = ethers.utils.hexValue(input).trim()
//     console.debug(`Parsed to ${parsedValue}`)
//     return parsedValue
// }

// const validateNetwork = (network, onSuccess = () => {}) => {
//     const chainId = toHex(network.chainId)
//     window.walletProvider.request({
//         method: 'wallet_switchEthereumChain',
//         params: [{ chainId }],
//     }).then(() => {
//         onSuccess()
//     }).catch((switchError) => {
//         window.walletProvider.request({
//             method: 'wallet_addEthereumChain',
//             params: [
//                 {
//                   chainId: chainId, 
//                   chainName: network.name,
//                   rpcUrls: network.rpc,                   
//                   blockExplorerUrls: network.explorers,  
//                   nativeCurrency: network.nativeCurrency
//                 }
//             ]})
//         // console.debug(switchError)
//         // // The network has not been added to MetaMask
//         // if (switchError.code === 4902) {
//         //   window.walletProvider.request({
//         //     method: 'wallet_addEthereumChain',
//         //     params: [
//         //         {
//         //           chainId: chainId, 
//         //           chainName: network.name,
//         //           rpcUrls: network.rpc,                   
//         //           blockExplorerUrls: network.explorers,  
//         //           nativeCurrency: network.nativeCurrency
//         //         }
//         //     ]});
//         // } else {
//         //   const errMsg = "Cannot switch to the network";
//         //   console.debug(errMsg)
//         //   onErrorMessage(errMsg)
//         // }
//     })
// }

// const isJson = (str) => {
//     try {
//         const val = JSON.parse(str)
//         if (val && typeof val === 'object')
//             return true
//     } catch (e) {
//         console.log(e)
//     }
//     return false
// }

// export default {
//     getComponent,
//     isEditor,
//     show,
//     hide,
//     onSuccessMessage,
//     onErrorMessage,
//     sendNotification,
//     getAccount,
//     getProvider,
//     initComponent,
//     getSigner,
//     getContract,
//     getBalances,
//     getProviderOptions,
//     formatAddress,
//     setComponentText,
//     getCachedProvider,
//     validateNetwork,
//     toHex,
//     isJson
// }