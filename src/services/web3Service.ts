
import { ethers } from "ethers";


export const detectMetamaskExtensionInstalled = (): false | any => {
    const {ethereum} = window as any;
    if (typeof ethereum !== 'undefined') {
        return new ethers.providers.Web3Provider(ethereum);
    } else {
        alert("Install extension : https://metamask.io/ and create your account to use this application")
        return false;
    }
}


export const metamaskLoginModel = async (provider:any): Promise<any> => {
    try {
        //window.ethereum => provider
        const resp = await provider.request({ method: 'eth_requestAccounts' });
        return new Promise( (resolve, _reject) => {
            resolve(resp);
        });
    } catch (error) {
        alert("Login to Metamask first");
        return new Promise( (_resolve, reject) => {
            reject("Error, can't find valid account");
        });
    }
}

export const isMetaMaskConnected = async (provider:any) => {
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
}