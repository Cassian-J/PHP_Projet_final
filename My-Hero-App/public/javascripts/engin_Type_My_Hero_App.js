import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { getCookie } from "./cookies.js";

window.socket = io();

var UserUuid = getCookie("UserUuid");

document.getElementById("createEnginType").onclick = function () {
    const enginTypeName = document.getElementById("enginTypeName").value;
    if (enginTypeName !== "") {
        socket.emit("createEnginType", { EnginTypeName: enginTypeName, UserUuid: UserUuid  });
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
