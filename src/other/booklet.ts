import {BACKEND_API} from "./variables";

function bookletCleanup(booklet: string) {
    return booklet.replaceAll('\n', '')
        .replaceAll(new RegExp(/\s*\{\s*/gm), '{')
        .replaceAll(new RegExp(/\s*}\s*/gm), '}')
        .replaceAll(new RegExp(/\s*\)\s*/gm), ')')
        .replaceAll(new RegExp(/\s*\(\s*/gm), '(')
        .replaceAll(new RegExp(/\s*=\s*/gm), '=')
        .replaceAll(new RegExp(/\s*,\s*/gm), ',')
        .replaceAll(new RegExp(/\s*:\s*/gm), ':')
        .replaceAll(new RegExp(/\s*\?\s*/gm), '?')
        .replaceAll(new RegExp(/\s*;\s*/gm), ';');
}

export function booklet(secretCode: string): string {
    const actualCode = bookletCleanup(`
        const windowReference = window.open();
        const xhr = new XMLHttpRequest();
        function openNewWindow() {
           windowReference.location = "${window.location.protocol}//${window.location.host}/setLink.html?secretCode=${secretCode}&link="
                + encodeURIComponent(window.location.href);
        }
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                if (this.responseText == "") {
                    openNewWindow();
                }
                alert(JSON.parse(this.responseText).updated ? "Updated" : "Not Updated");
            }
        });
        xhr.onerror = function(e) {
            openNewWindow();
        };
        xhr.open("POST", "${BACKEND_API}/setLink");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            "secretCode": "${secretCode}",
            "link": window.location.href
        }));`);
    return `javascript:${encodeURIComponent(`(function(){${actualCode.trim()}})();`)}`;
}
