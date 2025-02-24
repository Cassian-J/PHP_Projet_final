import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import {getCookie} from "cookies.js";

window.socket = io();

document.getElementById("create_city").onclick = function() {
    const cityInfo = {
        CityName: document.getElementById("cityName").value,
    };
    if (cityInfo.CityName !== "" ) {
        window.socket.emit("newCity", cityInfo);
    } else {
        alert("Remplissez le champ");
        return;
    }

}

socket.on("CityCréationSucess", sucess => {
    document.location.href="/My_Hero_App";
});

socket.on("Error", error => {
    alert(error);
});