import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { getCookie } from "./cookies.js";

window.socket = io();
const cityInfo = {};
var UserUuid = getCookie("UserUuid");
cityInfo.UserUuid= UserUuid
document.getElementById("create_city").onclick = function () {
    const cityName = document.getElementById("cityName").value;
    cityInfo.CityName= cityName;
    if (cityName !== "") {
        socket.emit("createCity", cityInfo);
    } else {
        alert("City Name cannot be empty");
    }
};

socket.on("CityCreated", success => {
    if (success) alert("City created successfully!");
});

socket.on("Error", message => {
    alert("Error: " + message);
});
