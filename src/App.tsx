import React, { MouseEventHandler, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
//import { detectMetamaskExtensionInstalled, isMetaMaskConnected, metamaskLoginModel } from './services/web3Service';
import detectEthereumProvider from '@metamask/detect-provider';
import { metamaskLoginModel } from './services/web3Service';
import { ChainIdsEnum } from './constants/ChainIdsEnum';

function App() {

  const [provider, setProvider] = useState<any>(null);

  const clickPay = async (event:any): Promise<any> => {

    if ( provider ) { 
      /**
       * https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
       * 0x1	1	Ethereum Main Network (Mainnet)
         0x3	3	Ropsten Test Network
         0x4	4	Rinkeby Test Network
         0x5	5	Goerli Test Network
         0x2a	42	Kovan Test Network
       */
      const chainId = await provider.request({ method: 'eth_chainId' });
      const chainName = (ChainIdsEnum as any)[chainId];
      let account = await provider.request({ method: 'eth_accounts' });
      if ( account.length === 0 ) {
        account = await metamaskLoginModel(provider)
      }

      console.log(`${chainId} : ${chainName}`);
      console.log(account);

      // provider.on('accountsChanged', (accounts:any) => {
        
      // })

      
    } else {
      alert("Install metamask extension and create your account !")
    }

  }

  async function loadWeb3Provider() {
    const provider:any = await detectEthereumProvider();
    if ( provider ) {
      setProvider(provider);
      
      // window.ethereum or provider
      (provider as any).on('accountsChanged', (accounts:string[]) => {
        console.log(`${accounts}`)
      });

      (provider as any).on('chainChanged', (data:any) => {
        console.log(`Chain changed${data}`);
        window.location.reload(); // good practise
      });

    } else {
      alert("Install metamask extension and create your account !")
    }
  }



  useEffect( () => {
    loadWeb3Provider();
  }, []);




  return (
    <div className="App">
      <button onClick={clickPay}>Pay</button>
    </div>
  );
}

export default App;

