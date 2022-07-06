import {BACKEND_API} from "./variables";

export interface createNewSecretCodeResponse {
    "inserted": boolean,
    "secretCode": string
}

export default class restCalls {
    private static baseURL: string = BACKEND_API;

    public static async getLink(secretCode: string): Promise<string> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        const apiRes = await (await fetch(`${this.baseURL}/getLink/${secretCode}`, requestOptions)).json();
        return apiRes.link;
    }

    public static async createNewSecretCode(): Promise<createNewSecretCodeResponse> {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        return await (await fetch(`${this.baseURL}/createNewSecretCode`, requestOptions)).json();
    }

}
