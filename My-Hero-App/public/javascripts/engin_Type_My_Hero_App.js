import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { getCookie } from "./cookies.js";

window.socket = io();
const enginTypeInfo = {};
var UserUuid = getCookie("UserUuid");
enginTypeInfo.UserUuid= UserUuid
document.getElementById("createEnginType").onclick = function () {
    const enginTypeName = document.getElementById("enginTypeName").value;
    enginTypeInfo.EnginTypeName= enginTypeName;
    if (enginTypeName !== "") {
        socket.emit("createEnginType", enginTypeInfo);
    } else {
        alert("Engin Type Name cannot be empty");
    }
};

socket.on("EnginTypeCreated", success => {
    if (success) alert("Engin Type created successfully!");
});

socket.on("Error", message => {
    alert("Error: " + message);
});
