import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { getCookie } from "./cookies.js";

window.socket = io();
const planetInfo = {};
var UserUuid = getCookie("UserUuid");
planetInfo.UserUuid=UserUuid;
document.getElementById("create_planet").onclick = function () {
    const planetName = document.getElementById("planetName").value;
    planetInfo.PlanetName = planetName;
    if (planetName !== "") {
        socket.emit("createPlanet", planetInfo);
    } else {
        alert("Planet Name cannot be empty");
    }
};

socket.on("PlanetCreated", success => {
    if (success) alert("Planet created successfully!");
});

socket.on("Error", message => {
    alert("Error: " + message);
});
