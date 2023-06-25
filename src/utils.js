import constants from './constant'
import abi from './abi.json'

const { EVENT, STANDARD } = constants

const getComponent = (id) => {
    const component = document.getElementById(id)
    console.debug(`getComponent ${id} ${component}`)
    return component
}

const isEditor = () => {
    const isEditorView = window.location.href.includes('/e/')
    console.debug(`isEditor ${isEditorView}`)
    return isEditorView
}

const show = (id) => {
    getComponent(id).classList.remove('hidden')
    console.debug(`component ${id} shown by removing hidden property css`)
}

const hide = (id) => {
    getComponent(id).classList.add('hidden')
    console.debug(`component ${id} hidden by adding hidden property css`)
}

const sendNotification = (alertSeverity, message, link, timeout) => {
    const detail = { 
        detail: { 
            alertSeverity, 
            message, 
            link,
            timeout
        }
    };
    const cEvent = new CustomEvent('onToast', detail)
    console.debug(`Sending notification of ${alertSeverity} with message ${message} and link ${link} for timeout ${timeout}`)
    document.dispatchEvent(cEvent);
}

const onSuccessMessage = (message, link=null, timeout=5000) => {
    sendNotification('success', message, link, timeout)
}

const onErrorMessage = (message, link=null, timeout=5000) => {
    sendNotification('error', message, link, timeout)
}

const getAccount = () => {
    console.debug(`Retrieving wallet account from provider ${window.walletProvider}`)
    const provider = window.walletProvider;
    if (!provider) return;

    if (provider.accounts && provider.accounts.length > 0)
      return provider.accounts[0];
    
    return provider.selectedAddress;
}

const getProvider = () => {
    console.debug(`Retrieving web3 provider ${window.walletProvider}`)
    return new window.ethers.providers.Web3Provider(window.walletProvider)
}

const getSigner = () => {
    const provider = getProvider()
    const signer = provider.getSigner()
    console.debug(`Found signer`)
    console.debug(signer)
    return signer
}

const initComponent = (id, handler=()=>{}) => {
    if (isEditor()) {
        console.log(`Listeners cannot be added to component ${id} while in editor mode`)
        return
    }
    if (!window.listeners)
        window.listeners = []
    if (!window.listeners[id])
        window.listeners[id] = []
    if (window.listeners[id].length > 0) {
        console.log(`Listeners already exist for component ${id}`)
        return
    }
    console.debug(`Adding listeners for component ${id}`)
    window.listeners[id] = [
        document.addEventListener(EVENT.ACCOUNT_CHANGED, handler),
        document.addEventListener(EVENT.CHAIN_CHANGED, handler),
        document.addEventListener(EVENT.NETWORK_CHANGED, handler),
        document.addEventListener(EVENT.CONNECTED, handler),
        document.addEventListener(EVENT.DISCONNECTED, handler),
    ]
    handler()
}

const getContract = (address, abi) => {
    console.debug(`Retrieving contract for adress ${address} with abi ${JSON.stringify(abi)}`)
    const contract = new ethers.Contract(address, abi, getSigner())
    return contract
}

const getBalances = ({ address, standard=STANDARD.ERC721, tokenIds=[], handler=()=>{} }) => {
    console.debug(`Retrieving balances for ${standard} contract ${address} as an array`)
    const account = getAccount()
    const contract = getContract(address, abi[standard])
    switch(standard) {
        case STANDARD.ERC721:
            console.debug(`Invoking balanceOf`)
            contract.balanceOf(account).then((balance) => handler([balance]))
        break
        case STANDARD.ERC1155:
            console.debug(`Invoking balanceOfBatch`)
            contract.balanceOfBatch([account], tokenIds).then(handler)
        break;
        default:
            handler(null, 'not_supported_standard')
            console.debug('not_supported_standard')
    }
}

export default {
    getComponent,
    isEditor,
    show,
    hide,
    onSuccessMessage,
    onErrorMessage,
    sendNotification,
    getAccount,
    getProvider,
    initComponent,
    getSigner,
    getContract,
    getBalances
}