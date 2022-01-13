
// Make sure to run npx hardhat node

export interface IAnnounce {
    "id": string
    "title": string
    "price": number
}

const mockAccounts = [
    {
        pubKey: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
        privateKey:""
    },
    {
        pubKey: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        privateKey: ""
    }
    
]

export const makingAnnounces = (currentAccountKey:string) => {
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