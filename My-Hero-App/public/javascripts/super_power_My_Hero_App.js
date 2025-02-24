import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { getCookie } from "./cookies.js";

window.socket = io();
const superPowerInfo = {};
var UserUuid = getCookie("UserUuid");
superPowerInfo.UserUuid=UserUuid;
document.getElementById("createSuperPower").onclick = function () {
    const superPowerName = document.getElementById("superPowerName").value;
    const superPowerDescription = document.getElementById("superPowerDesc").value;
    superPowerInfo.SuperPowerName=superPowerName;
    superPowerInfo.SuperPowerDescription=superPowerDescription;
    if (superPowerName !== "" && superPowerDescription !== "") {
        socket.emit("createSuperPower", superPowerInfo );
    } else {
        alert("Super Power Name and Description cannot be empty");
    }
};

socket.on("SuperPowerCreated", success => {
    if (success) alert("Super Power created successfully!");
});

socket.on("Error", message => {
    alert("Error: " + message);
});