import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"

export const Announces = () => {


    let [searchLoading, setSearchLoading] = useState<boolean>(false);
    let [announces, setAnnounces] = useState<any>(Array.from({ length: 25 }).fill({ "item": "MOCK" }));

    const searchChange = (e: any) => {
        setSearchLoading(true);
        setTimeout(() => {
            setAnnounces([...announces.filter((val: any, i: number) => i !== e.target.value.length)]);
            setSearchLoading(false);
        }, 1000)
    }


    useEffect(() => {

    }, []);


    return (
        <div className="container mx-auto">
            <input
                onChange={searchChange}
                className="mt-4 shadow-lg bg-gray-200 text-4xl appearance-none border-2 border-gray-200 rounded w-full py-6 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-200" id="inline-full-name" type="text" placeholder="Rechercher ..." />

            <div className="mt-5 mb-5 ml-2">

                <div className="mt-2 mb-2 h-4 text-center">
                    {
                        searchLoading && searchLoading === true && <p className="text-4xl">...</p>
                    }
                </div>

                <div className="flex mt-10">
                    <p className="text-4xl flex-1">📋 {announces.length}</p>
                </div>

            </div>

            <div className={searchLoading === true ? "flex mt-50 flex-wrap mt-5" : "flex mt-50 flex-wrap mt-5"}>
                {
                    announces.map((el: any) => {
                        return <div className="max-w-sm rounded overflow-hidden shadow-lg mb-5 m-10">
                            <img className="w-full" src="https://www.mrcartonnagenumerique.com/wp-content/uploads/2019/09/banner_mockup.jpg" alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                                <p className="text-gray-700 text-base">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus quia, nulla!Maiores et perferendis eaque, exercitationem praesentium nihil.
                                </p>
                                <div className="text-center mt-5 mb-5">
                                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                        Buy for 10
                                    </button>
                                </div>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    )
}