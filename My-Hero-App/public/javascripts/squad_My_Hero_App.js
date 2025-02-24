import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { getCookie } from "./cookies.js";

window.socket = io();
const squadInfo = {};
var UserUuid = getCookie("UserUuid");
squadInfo.UserUuid=UserUuid;
document.getElementById("createSquad").onclick = function () {
    const squadName = document.getElementById("squadName").value;
    squadInfo.squadName = squadName;
    if (squadName !== "") {
        socket.emit("createSquad", squadInfo);
    } else {
        alert("Squad Name cannot be empty");
    }
};

socket.on("SquadCreated", success => {
    if (success) alert("Squad created successfully!");
});

socket.on("Error", message => {
    alert("Error: " + message);
});
