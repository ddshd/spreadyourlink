import {BACKEND_API} from "./variables";

function bookletCleanup(booklet: string) {
    return booklet.replaceAll('\n', '')
        .replaceAll(new RegExp(/\s*\{\s*/gm), '{')
        .replaceAll(new RegExp(/\s*}\s*/gm), '}')
        .replaceAll(new RegExp(/\s*\)\s*/gm), ')')
        .replaceAll(new RegExp(/\s*\(\s*/gm), '(')
        .replaceAll(new RegExp(/\s*=\s*/gm), '=')
        .replaceAll(new RegExp(/\s+,\s+/gm), ',')
        .replaceAll(new RegExp(/\s*:\s*/gm), ':')
        .replaceAll(new RegExp(/\s*\?\s*/gm), '?')
        .replaceAll(new RegExp(/\s*\+\s*/gm), '+')
        .replaceAll(new RegExp(/\s*;\s*/gm), ';');
}

export function booklet(secretCode: string): string {
    /* eslint-disable */
    const actualCode = `
        const xhr = new XMLHttpRequest();
        function openNewWindow() {
           const url = "${window.location.protocol}//${window.location.host}/setLink.html?secretCode=${secretCode}&link="
                    + encodeURIComponent(window.location.href);
           try {
               var openedWindow = window.open(url);
               if(!openedWindow || openedWindow.closed || typeof openedWindow.closed === "undefined")  {
                throw new Error('Popup blocked, throwing exception to be caught.');
               }
           }
           catch {
                if (confirm(\"Your browser does not support any of our primary methods for updating the URL. We have one more method, however, this will cause your page to redirect. This may cause you to lose any information you have entered on this page. Is this okay?\")) {
                    window.location.assign(url);
                }
                return;
           }
        }
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                alert(JSON.parse(this.responseText).updated ? "Updated" : "Not Updated");
            }
        });
        xhr.onerror = function(e) {
            openNewWindow();
            return;
        };
        xhr.open("POST", "${BACKEND_API}/setLink");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            "secretCode": "${secretCode}",
            "link": window.location.href
        }));`;
    return `javascript:${encodeURIComponent(`(function(){${bookletCleanup(actualCode.trim())}})();`)}`;
}
