import {BACKEND_API} from "./variables";

// export interface createNewSecretCodeResponse {
//     inserted: boolean,
//     secretCode: string
// }

interface baseResponse {
    link: string,
    secretCode: string,
}

export interface getLinkResponse extends baseResponse {
    error: string | null
}

export interface setLinkResponse extends baseResponse {
    updated: boolean
}

export default class restCalls {
    private static baseURL: string = BACKEND_API;

    public static async getLink(secretCode: string): Promise<getLinkResponse> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        return await (await fetch(`${this.baseURL}/getLink/${secretCode}`, requestOptions)).json();
    }

    public static async setLink(secretCode: string, link: string): Promise<setLinkResponse> {
        const requestOptions: RequestInit = {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify({
                secretCode,
                link
            })
        };
        return await (await fetch(`${this.baseURL}/setLink`, requestOptions)).json();
    }

    public static async createNewSecretCode(): Promise<Response> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(`${this.baseURL}/createNewSecretCode`, requestOptions);
    }

}
