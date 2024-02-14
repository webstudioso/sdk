/**
 * This module enables datasource tagged text fields from the editor to retrieve data
 * from third party API and replace the text on the html text component by the result
 * of the API query generated.
 * 
 * View DatasourceTrait in studio project to learn more.
 */
import { ethers } from 'ethers'
import { getSigner } from '../utils/web3'
import constants from '../constant'

const {
    Contract,
    formatEther
} = ethers

const  {
    EVENT
} = constants

export const parseAbiMethod = (elementAttributeValue) => {
    let method
    try {
        method = JSON.parse(atob(elementAttributeValue))
    } catch (e) {
        console.log(`SDK parseAbiMethod failed for invalid input ${elementAttributeValue} with error ${e}`)
    }
    return method
}

export const updateFieldsWithValues = (fields, values) => {
    fields.forEach((element, index) => {
        const { format } = element.attributes
        const value = values[index]
        switch(format.value) {
            case 'formatEther':
                const formattedValue = formatEther(value)
                const decoratedValue = Number(formattedValue).toLocaleString()
                element.textContent = decoratedValue
                break
            default:
                element.textContent = value
        }
    })
}

/**
 * Handle API calls and data refresh
 */
export const onDataChanged = async (event) => {
    console.log(`Firing datasource event ${EVENT.DATA_CHANGED}`)
    // Find all elements with datasource mapping
    const smartContractMappedTextFields = document.querySelectorAll(`[datasource="smart_contract"]`)
    const promises = []
    const fields = []
    let refreshedValues
    // Signer if connected, main chain from Web3Modal config if not connected
    const signer = await getSigner()
    // Assemble calls
    smartContractMappedTextFields.forEach((element) => {
        const { contract, method, format } = element.attributes
        const methodAbi = parseAbiMethod(method?.value)
        if (contract && methodAbi && format) {
            const contractTgt = new Contract(contract.value, [methodAbi], signer)
            const targetFunction = contractTgt[methodAbi.name]
            const attrs = null // To be added support on later iteration
            promises.push(targetFunction.apply(null, attrs))
            fields.push(element)
        }
    })
    // Execute calls in parallel
    if (promises.length > 0) {
        refreshedValues = await Promise.all(promises)
        updateFieldsWithValues(fields, refreshedValues)
    }
    return promises.length
}

export const initializeDatasource = () => {
    document.addEventListener(EVENT.DATA_CHANGED, onDataChanged)
    console.log(`Event listener added for ${EVENT.DATA_CHANGED}`)
    onDataChanged()
}
