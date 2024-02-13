import { onDataChanged } from './datasource'
import { ethers } from 'ethers'

jest.mock('ethers')

describe('Datasource', () => {

    describe('onDataChanged' , () => {

        ethers.BrowserProvider.mockImplementation(() => { return { getSigner: jest.fn().mockResolvedValue('signer') } })
        ethers.Contract.mockImplementation(() => { return { viewBalance: { apply: jest.fn().mockResolvedValue(Promise.resolve("123456789000000000000000000")) } } })
        ethers.formatEther.mockReturnValue("123456789")

        it('does not process if no datasource tagged elements exist in the document', async () => {
            const totalUpdated = await onDataChanged()
            expect(totalUpdated).toEqual(0)
        })

        it('returns the list of elements tagged with smart_contract, format, valid bytes32 method and datasource in document', async () => {
            document.body.innerHTML = `
            <div>
                <h1 id="a" datasource="smart_contract" contract="abc" format="formatEther" method="eyJpbnB1dHMiOltdLCJuYW1lIjoidmlld0JhbGFuY2UiLCJvdXRwdXRzIjpbeyJpbnRlcm5hbFR5cGUiOiJ1aW50MjU2IiwibmFtZSI6IiIsInR5cGUiOiJ1aW50MjU2In1dLCJzdGF0ZU11dGFiaWxpdHkiOiJ2aWV3IiwidHlwZSI6ImZ1bmN0aW9uIn0">Default</h1>
                <h2 id="b" datasource="smart_contract" contract="abc" format="none" method="eyJpbnB1dHMiOltdLCJuYW1lIjoidmlld0JhbGFuY2UiLCJvdXRwdXRzIjpbeyJpbnRlcm5hbFR5cGUiOiJ1aW50MjU2IiwibmFtZSI6IiIsInR5cGUiOiJ1aW50MjU2In1dLCJzdGF0ZU11dGFiaWxpdHkiOiJ2aWV3IiwidHlwZSI6ImZ1bmN0aW9uIn0">Default</h2>
                <h1 id="c" datasource="other">Default</h1>
                <h1 id="d" datasource="smart_contract">Default</h1>
                <h1 id="f" datasource="smart_contract" contract="abc" format="none" method="nonbytes32">Default</h1>
            </div>
            `
            const totalUpdated = await onDataChanged()
            expect(totalUpdated).toEqual(2)
            expect(document.getElementById('a').textContent).toEqual('123,456,789')
            expect(document.getElementById('b').textContent).toEqual('123456789000000000000000000')
        })

    })
})