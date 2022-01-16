import { API_CONFIGURATION } from "./config"

export const announcesApi = {
    "getAnnounces": async (): Promise<any> => {
        try {
            const response:Response = await fetch(`${API_CONFIGURATION.URL}/announces`, {
                "headers": {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            return new Promise( (resolve, _reject) => resolve(json));
        } catch ( e ) { 
            return new Promise( (_resolve, reject) => reject(e));
        }
    },
    "addAnnounce": async (newAnnounce:createAnnounceApi) => {
        try {
            const response:Response = await fetch(`${API_CONFIGURATION.URL}/announces`,
             {
                "method": "post",
                "body": JSON.stringify(newAnnounce),
                "headers": {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            return new Promise( (resolve, _reject) => resolve(json));
        } catch ( e ) { 
            return new Promise( (_resolve, reject) => reject(e));
        }
    }
}


export interface createAnnounceApi {
    amount: string
    contractAddress: string
    contractTitle: string
}

export interface AnnounceApi {
    id: string
    amount: string
    contractAddress: string
    contractTitle: string
}