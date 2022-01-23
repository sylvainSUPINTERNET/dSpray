import detectEthereumProvider from "@metamask/detect-provider";
import { Contract, ContractFactory, ethers } from "ethers";
import { useState } from "react";
import { ChainIdsEnum } from "../../constants/ChainIdsEnum";
import { metamaskLoginModel } from "../../services/web3Service";
import { getNetworkHex } from "../../utils/network";
import ArtifactAnnounce from "../../artifacts/contracts/AnnounceEscrow.sol/AnnounceEscrow.json";
import { announcesApi } from "../../api/announces.api";

export const AnnouncesCreate = () => {

    let [title, setTitle] = useState<string>("");
    let [description, setDescription] = useState<string>("");
    let [network, setNetwork] = useState<string>("");
    let [amount, setAmount] = useState<number>(0);

    //https://chainlist.org/
    // if you change network, you must convert to hex
    const submitForm = async ( ev:any ) => {
        ev.preventDefault();

        try {
            if ( network && network !== "" && description !== "" && description && title && title !== "" && amount > 0 ) {


                const provider:any = await detectEthereumProvider();
    
                let accounts = await provider.request({
                    "method" : "eth_accounts"
                });
    
                if ( accounts.length === 0 ) {
                    accounts = await metamaskLoginModel(provider);
                }
                
                await provider.request({
                        "method": "wallet_switchEthereumChain",
                        params: [{"chainId": await getNetworkHex(network)}]
                });

                const provider2 = new ethers.providers.Web3Provider((window as any).ethereum)
                const signer = provider2.getSigner();
                const {abi, bytecode} = ArtifactAnnounce;
                const factoryContractAnnounce = new ContractFactory(abi, bytecode,signer);
                
                const contractAnnounce = await factoryContractAnnounce.deploy(amount, title);
                const contract:Contract = await contractAnnounce.deployed();

                // TODO add to DB
                const resp  = await announcesApi.addAnnounce({
                    "amount": `${amount}`,
                    "contractTitle": await contract.title(),
                    "contractAddress": contract.address
                });


            } 

        } catch ( e ) {
            console.log(e);
        }


    };


    return (
        <div className="p-5">

            <div className="container mx-auto mt-10">
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                    <p className="font-bold">Attention</p>
                    <p>Lorsque vous ajoutez une annonce, celle-ci sera exposer sur la blockchain pour toujours ! </p>
                </div>

                <form className="mt-10" onSubmit={submitForm}>

                    <div>
                        <label className="text-2xl block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Tire de l'annonce
                        </label>
                        <input onChange={e => setTitle(e.target.value)} className="
                    w-full
                    shadow-lg
                    text-2xl
                    appearance-none 
                    block w-full
                    bg-gray-200 text-gray-700 border
                    border-gray-200 rounded
                    py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200"
                            id="grid-first-name" type="text" placeholder="" />
                    </div>

                    <div className="mt-5">
                        <label className="text-2xl block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Description
                        </label>
                        <input onChange={ e => setDescription(e.target.value)} className="
                    w-full
                    shadow-lg
                    text-2xl
                    appearance-none 
                    block w-full
                    bg-gray-200 text-gray-700 border
                    border-gray-200 rounded
                    py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200"
                            id="grid-first-name" type="text" placeholder="" />
                    </div>


                    <div className="mt-5">

                        <label className="text-2xl block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Network
                        </label>
                        <select onChange={e => setNetwork(e.target.value)} className="w-full
                    shadow-lg
                    text-2xl
                    appearance-none 
                    block w-full
                    bg-gray-200 text-gray-700 border
                    border-gray-200 rounded
                    py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200" id="grid-state">
                            <option>ETH-TESTNET</option>
                            <option>MATIC-TESTNET</option>
                        </select>

                    </div>

                    <div className="mt-5">
                        <label className="text-2xl block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Amount
                        </label>
                        <input onChange={ e => setAmount(parseInt(e.target.value))} className="
                    w-full
                    shadow-lg
                    text-2xl
                    appearance-none 
                    block w-full
                    bg-gray-200 text-gray-700 border
                    border-gray-200 rounded
                    py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200"
                            id="grid-first-name" type="number"/>
                    </div>

                    <div className="text-center mt-10">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            Publier l'annonce
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}