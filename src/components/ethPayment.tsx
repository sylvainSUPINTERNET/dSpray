import React, { MouseEventHandler, useEffect, useState } from 'react';
import logo from './logo.svg';

import { Contract, ethers, ContractFactory, utils, BigNumber} from "ethers";
import ArtifactAnnounce from "../artifacts/contracts/AnnounceEscrow.sol/AnnounceEscrow.json";

//import { detectMetamaskExtensionInstalled, isMetaMaskConnected, metamaskLoginModel } from './services/web3Service';
import detectEthereumProvider from '@metamask/detect-provider';
import { metamaskLoginModel } from '../services/web3Service';
import { ChainIdsEnum } from '../constants/ChainIdsEnum';
import { IAnnounce } from '../types/IAnnounces';
import { makeMockAnnounces } from '../mock/mockAnnounces';
import { announcesApi } from '../api/announces.api';
import { AnnouncesList } from '../components/announces';
import { Header } from '../components/header';

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


      // TODO : TO TEST don't forget to compile AnnounceEscrow WITHOUT onlyApplicant modifier for pay ( to test with 1 account)

      //const AnnounceContract = await getContractFactory("Announce");
      const provider2 = new ethers.providers.Web3Provider((window as any).ethereum)
      const signer = provider2.getSigner();
      const {abi, bytecode} = ArtifactAnnounce;
      
      const factoryContractAnnounce = new ContractFactory(abi, bytecode,signer);

      let etherStr = "5";
      let wei = ethers.utils.parseEther(etherStr);
      const contractAnnounce = await factoryContractAnnounce.deploy(wei, "My super announce of fdp");
      const contract:Contract = await contractAnnounce.deployed();
      

      const deployedAddress = contract.address;
      console.log(wei);
      console.log(contract.address);
      console.log(contract.deployTransaction);
      console.log(await contract.owner())

      let am = await contract.amount();
      
      try {
        console.log(am);
        const resp  = announcesApi.addAnnounce({
          "amount": am.toString(),
          "contractTitle": await contract.title(),
          "contractAddress": contract.address
        });
        console.log(resp)
      } catch ( e ) {
        console.log(e);
      }


      // test 2 ( user pay)
      const overrides = {
        value: ethers.utils.parseEther("5.0")
      }

      let txPay = await contract.pay(overrides);
      console.log(txPay);

      // test 3 ( withdraw )

      let txWithdraw = await contract.withDraw();
      console.log(txWithdraw);


      // test 4 - How to interact with contract ( from contract address )
      const factoryContractAnnounceFromAddress = new ContractFactory(abi, bytecode,signer)
      const deployedContractFound = factoryContractAnnounceFromAddress.attach(deployedAddress);
      console.log(await deployedContractFound.owner());
      console.log(await deployedContractFound.applicant());

      // TODO call method pay etc pour tester
      // TODO essayer de voir si a partir de contract.address j'arrive à retourner une instance d'un contract pour avoir des infos
      // si c'est le cas, il faut passer par une API intermediare en spring boot pour faire un truck du genre, on save dans mongoDB les address des contracts 
      // le titre et le montant 
      // du coup si le mec click sur un contrat, on sait sur lequel tapé


      // console.log("2")

      // console.log(contract.address);  
      // console.log(contract.deployTransaction);
      // console.log("3")

      // console.log("TITLE ?", await contract.title())
      // console.log("TITLE ?", await contract.owner())

      
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
    <div className="">
      <Header/>
      <button className="" onClick={clickPay}>Pay</button>
      <AnnouncesList/>
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

