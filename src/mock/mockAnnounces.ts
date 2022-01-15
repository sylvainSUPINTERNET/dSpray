
// Make sure to run npx hardhat node

import { IAnnounce } from "../types/IAnnounces";



// fake account generate by hardhat for local testing
const mockAccounts = [
    {
        pubKey: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
        privateKey:"0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
    },
    {
        pubKey: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    }
    
]

export const makeMockAnnounces = (currentAccountKey:string) => {
        let validAccounts = mockAccounts.filter( account => account.pubKey !== currentAccountKey);

        let announces:IAnnounce[] = [];
        validAccounts.forEach( (account, v) => {
            announces = [...announces, {
                "id": `${v}-${account.pubKey}`,
                "title": "title",
                "price": 5.00
            }];
        })

        return announces;
}   