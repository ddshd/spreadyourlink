import Cookies from "universal-cookie";

const cookies = new Cookies();

export function getSecretCodeCookie() {
    return cookies.get('secretCode');
}

export function setSecretCodeCookie(secretCode: string) {
    cookies.set('secretCode', secretCode, {path: '/'});
}

export function removeSecretCodeCookie() {
    cookies.remove('secretCode');
}

export function redirect(link: string): boolean {
    if (process.env.REACT_APP_REAL_SERVER) {
        window.location.href = link;
        return true;
    }
    else {
        window.location.hash = link;
        return false;
    }
}
