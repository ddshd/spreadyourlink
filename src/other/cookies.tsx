import Cookies from "universal-cookie";
const cookies = new Cookies();

export function getSecretCodeCookie() {
    return cookies.get('secretCode');
}

export function setSecretCodeCookie(secretCode: string) {
    cookies.set('secretCode', secretCode, { path: '/' });
}

export function removeSecretCodeCookie() {
    cookies.remove('secretCode');
}

export function redirect(link: string) {
    window.location.href = link;
};
