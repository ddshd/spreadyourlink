import {BACKEND_API} from "./variables";

// export interface createNewSecretCodeResponse {
//     inserted: boolean,
//     secretCode: string
// }

export interface getLinkResponse {
    link: string,
    secretCode: string,
    error: string | null
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

    public static async createNewSecretCode(): Promise<Response> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(`${this.baseURL}/createNewSecretCode`, requestOptions);
    }

}
