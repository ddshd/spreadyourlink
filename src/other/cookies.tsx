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

/**
 * Redirect the user to another page
 * @param link - The link to redirect the user to
 * @returns true if this action will cause the page to
 * reload or leave the site entirely.
 *
 * Used to avoid double API
 * calls, due to a redirect back to the same page.
 */
export function redirect(link: string): boolean {
    if (link.includes('http') || process.env.REACT_APP_REAL_SERVER) {
        window.location.href = link;
        return true;
    }
    else {
        window.location.hash = link;
        return false;
    }
}
