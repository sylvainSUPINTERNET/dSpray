import React, { MouseEventHandler, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Contract, ethers, ContractFactory } from "ethers";
import ArtifactAnnounce from "./artifacts/contracts/Announce.sol/Announce.json";

//import { detectMetamaskExtensionInstalled, isMetaMaskConnected, metamaskLoginModel } from './services/web3Service';
import detectEthereumProvider from '@metamask/detect-provider';
import { metamaskLoginModel } from './services/web3Service';
import { ChainIdsEnum } from './constants/ChainIdsEnum';
import { IAnnounce } from './types/IAnnounces';
import { makeMockAnnounces } from './mock/mockAnnounces';

function App() {

  const [provider, setProvider] = useState<any>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [announces, setAnnounces] = useState<IAnnounce[]>([]);

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
      let accounts = await provider.request({ method: 'eth_accounts' });


      if ( accounts.length === 0 ) {
        accounts = await metamaskLoginModel(provider)
      }

      console.log(`${chainId} : ${chainName}`);
      console.log(accounts);
      setAccounts(accounts);

      // MOCK
      setAnnounces(makeMockAnnounces(accounts[0]));

      // bytecode = fs.readFileSync('storage.bin').toString();
      //abi = JSON.parse(fs.readFileSync('storage.abi').toString());
      //const factory = new ContractFactory(contractAbi, contractByteCode);

      //const AnnounceContract = await getContractFactory("Announce");
      const provider2 = new ethers.providers.Web3Provider((window as any).ethereum)
      const signer = provider2.getSigner();
      const {abi, bytecode} = ArtifactAnnounce;
      
      const factoryContractAnnounce = new ContractFactory(abi, bytecode,signer);
      const contractAnnounce = await factoryContractAnnounce.deploy("TOTO announce", 500);

      console.log("1")
      const contract:Contract = await contractAnnounce.deployed();
      console.log("2")

      console.log(contract.address);  
      console.log(contract.deployTransaction);
      console.log("3")

      console.log("TITLE ?", await contract.title())
      console.log("TITLE ?", await contract.owner())

      
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
  
  const clickBuy = (ev:any) => {

  }



  useEffect( () => {
    loadWeb3Provider();
  }, [accounts]);




  return (
    <div className="App">
      <button className="" onClick={clickPay}>Pay</button>
      {
        accounts.length > 0 && accounts.map( (address:string) => {
          return <p> CONNECTED : {address} </p>
        })
      }

      {
        announces && announces.length > 0 && announces.map( (announce:IAnnounce ) => {
          return <div className="mt-5">
            <p>ID : {announce.id}</p>
            <p>Title : {announce.title}</p>
            <p> Price : {announce.price}</p>
            <button onClick={clickBuy}> Acheter </button>
          </div>
        })
      }

    </div>
  );
}

export default App;

