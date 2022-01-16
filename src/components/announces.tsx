import { useEffect, useState } from "react"
import { AnnounceApi, announcesApi } from "../api/announces.api";
import {ethers} from "ethers";
import { FaEthereum } from 'react-icons/fa';

export const AnnouncesList = () => {

    const [announces, setAnnounces] = useState<AnnounceApi[]>([]);

    async function loadAnnounces() {
        try {
            const listAnnounces = await announcesApi.getAnnounces();
            setAnnounces(listAnnounces);
        } catch (e) {
            console.log("error while loeading announces");
        }
    }

    const onClickAnnounce = (ev:any, announce:AnnounceApi) => {
        // const ethValue = ethers.utils.formatEther(ethers.utils.parseEther(announce.amount+""));
        alert(announce.contractAddress)
    }

    useEffect(() => {
        loadAnnounces();
    }, [])

    return (
        <div className="mt-40">
            <h1 className="flex justify-center">Annonces</h1>
            <div className="flex justify-center flex-wrap">
                {
                    announces && announces.map((announce: AnnounceApi) => {
                        return (
                            <div className="p-10">
                                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                    <img className="w-full" src="/mountain.jpg" alt="Mountain" />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{announce.contractTitle}</div>
                                        <div className="flex justify-center">
                                            <p className="text-gray-700 text-base">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex" onClick={e => onClickAnnounce(e,announce)}>
                                                    Buy {ethers.utils.formatEther(announce.amount)} <FaEthereum className="mt-1 ml-1"/> 
                                                </button>
                                            </p>
                                        </div>

                                    </div>
                                    {/* <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                    </div> */}
                                </div>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>

    )
}