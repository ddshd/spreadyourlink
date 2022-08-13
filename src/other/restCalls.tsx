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
    private static notificationMessage: string = "To save server costs this API request will take longer than normal.";
    private static apiTookTooLongMS: number = 2000;

    public static async getLink(secretCode: string, notificationCallback: (m: string) => void): Promise<getLinkResponse> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        const timeOut = setTimeout(() => notificationCallback(this.notificationMessage), this.apiTookTooLongMS);
        const apiRes = await (await fetch(`${this.baseURL}/getLink/${secretCode}`, requestOptions)).json();
        clearTimeout(timeOut);
        return apiRes;
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

    public static async createNewSecretCode(notificationCallback: (m: string) => void): Promise<Response> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        const timeOut = setTimeout(() => notificationCallback(this.notificationMessage), this.apiTookTooLongMS);
        const apiRes = await fetch(`${this.baseURL}/createNewSecretCode`, requestOptions);
        clearTimeout(timeOut);
        return apiRes;
    }

}
