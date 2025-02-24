import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import {getCookie} from "cookies.js";

window.socket = io();

document.getElementById("create_planet").onclick = function() {
    const planetInfo = {
        PlanetName: document.getElementById("planetName").value,
    };
    if (planetInfo.PlanetName !== "" ) {
        window.socket.emit("newPlanet", planetInfo);
    } else {
        alert("Remplissez le champ");
        return;
    }

}

socket.on("PlanetCréationSucess", sucess => {
    document.location.href="/My_Hero_App";
});

socket.on("Error", error => {
    alert(error);
});