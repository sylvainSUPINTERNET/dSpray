# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```


https://dev.to/hideckies/ethers-js-cheat-sheet-1h5j


npm run generateContractsArtifacts ( generate abi etc for smart contract ) // configuration overrided in hardhat to create artifact into src and be accessible from react
npm run start ( start GUI ofc)



# Using another network 

        const provider:any = await detectEthereumProvider();
        // const chainId = await provider.request({ method: 'matic_chainId' });
        // const chainName = (ChainIdsEnum as any)[chainId];
        
        let accounts = await provider.request({ method: 'eth_accounts' });
        let c = await provider.request({
            "method": "wallet_switchEthereumChain",
            params: [{"chainId": "0x13881"}]
        })
        console.log(c);
        if ( accounts.length === 0 ) {
          accounts = await metamaskLoginModel(provider)
        }
    };