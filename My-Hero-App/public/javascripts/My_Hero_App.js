import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

// this section of code is used t ocheck if the client have 
// a valable user uuid
var UserUuid = getCookie("UserUuid");
socket.emit("CheckUserUuid", UserUuid);

socket.on("UserError", message => {
    alert(message);
    document.location.href="/";
});

function getCookie(name) {
    const cookies = document.cookie.split('; ')
    const value = cookies
        .find(c => c.startsWith(name + "="))
        ?.split('=')[1]
    if (value === undefined) {
        document.location.href="/";
        return null;
    } 
    return decodeURIComponent(value)
}