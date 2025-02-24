import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { getCookie } from "./cookies.js";

window.socket = io();

document.getElementById("createHero").onclick = function() {
    const heroInfo = {
        superhero : {
            SuperHeroName: document.getElementById("superHeroName").value,
            SuperHeroDescription: document.getElementById("superHeroDescription").value,
            SuperHeroSex: document.getElementById("superHeroSex").value,
            UserUuid : getCookie("UserUuid")
        },
        autre : {
            SuperPowerName: document.getElementById("superPowerName").value,
            PlanetName: document.getElementById("planetName").value,
            SquadName: document.getElementById("squadName").value,
            CityName: document.getElementById("cityName").value
        }
    }

    if (
        heroInfo.superhero.SuperHeroName !== "" &&
        heroInfo.superhero.SuperHeroDescription !== "" &&
        heroInfo.superhero.SuperHeroSex !== "" &&
        heroInfo.autre.SuperPowerName !== "" &&
        heroInfo.autre.SuperPowerDescription !== "" &&
        heroInfo.autre.PlanetName !== "" &&
        heroInfo.autre.SquadName !== ""
    ) {
        window.socket.emit("newHero", heroInfo);
    } else {
        alert("Veuillez remplir tous les champs.");
        return;
    }
};

socket.on("HeroCréationSucess", sucess => {
    document.location.href = "/My_Hero_App";
});

socket.on("Error", error => {
    alert(error);
});