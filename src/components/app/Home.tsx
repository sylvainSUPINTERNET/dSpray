export const Home = () => {
    return (
        <div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="text-center pt-40 pb-40">
                    <h1 className="text-2xl">Le web 3.0 devient une réalité</h1>
                </div>
            </div>
            <div className="pt-10 bg-red-600 p-5">
                <h2 className="text-center text-2xl">Comment ça marche ?</h2>
                <div className="mt-10">
                    <div className="flex justify-center space-x-2">
                        <div className="m-10">
                            <p>Déployer vos annonces sur la blockchain</p>
                            <p>Recevez votre argent sur votre wallet dans l'actif qui vous convient, le tout sécurisé via l'utilisation de smart contract</p>
                            <div className="mt-10 flex justify-center space-x-10">
                                <p>Sécurisé</p>
                                <p>Décentralisé</p>
                                <p>Simplicité</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}