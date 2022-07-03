// const xhr = new XMLHttpRequest();
// xhr.addEventListener("readystatechange", function() {
//     if(this.readyState === 4) {
//         alert(JSON.parse(this.responseText).updated ? "Updated" : "Not Updated");
//     }
// });
// xhr.open("POST", "http://localhost:8080/setLink");
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.send(JSON.stringify({
//     "secretCode": "apple",
//     "link": window.location.href
// }));

export function booklet(secretCode: string): string {
    return `javascript:(function()%7Bconst%20xhr%20%3D%20new%20XMLHttpRequest()%3Bxhr.addEventListener(%22readystatechange%22%2C%20function()%20%7Bif(this.readyState%20%3D%3D%3D%204)%20%7Balert(JSON.parse(this.responseText).updated%20%3F%20%22Updated%22%20%3A%20%22Not%20Updated%22)%3B%7D%7D)%3Bxhr.open(%22POST%22%2C%20%22http%3A%2F%2Flocalhost%3A8080%2FsetLink%22)%3Bxhr.setRequestHeader(%22Content-Type%22%2C%20%22application%2Fjson%22)%3Bxhr.send(JSON.stringify(%7B%22secretCode%22%3A%20%22${secretCode}%22%2C%22link%22%3A%20window.location.href%7D))%7D)()`;
}
