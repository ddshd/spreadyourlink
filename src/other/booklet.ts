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
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                alert(JSON.parse(this.responseText).updated ? "Updated" : "Not Updated");
            }
        });
        xhr.onerror = function(e) {
            window.open("${BACKEND_API}/setLink/${secretCode}/" + encodeURIComponent(window.location.href));
        };
        xhr.open("POST", "${BACKEND_API}/setLink");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            "secretCode": "${secretCode}",
            "link": window.location.href
        }));`);
    return `javascript:${encodeURIComponent(`(function(){${actualCode.trim()}})();`)}`;
}
