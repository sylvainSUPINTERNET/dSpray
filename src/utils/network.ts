
/**
 * https://chainlist.org/
 * @param networkName 
 * Support only for ETH testned and MATIC testnet (for the moment)
 */
export const getNetworkHex = async (networkName:string) : Promise<string> => {
    let hexChainid = "";
    switch(networkName) {
        case "ETH-TESTNET":
            hexChainid = "0x3"
            break;
        case "MATIC-TESTNET":
            hexChainid="0x13881"
            break;
        default:
            hexChainid = "0x3"
            break;
    }
    return new Promise( (resolve, _reject) => {
        resolve(hexChainid);
    })
}