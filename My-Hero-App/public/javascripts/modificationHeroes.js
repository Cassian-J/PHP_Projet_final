import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const heroUuid = urlParams.get("uuid");

    if (!heroUuid) {
        alert("Aucun héros sélectionné !");
        window.location.href = "/My-Hero-App"; 
        return;
    }

    document.getElementById("hero-uuid").value = heroUuid;

    try {
        const response = await fetch(`http://localhost:8000/api/super_hero/${heroUuid}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération du héros.");

        const hero = await response.json();
        fillHeroForm(hero);
    } catch (error) {
        console.error("Erreur:", error);
        alert("Impossible de charger les informations du héros.");
    }

    document.getElementById("hero-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        updateHero(heroUuid);
    });
});

function fillHeroForm(hero) {
    document.getElementById("hero-name").value = hero.SuperHeroName;
    document.getElementById("hero-sex").value = hero.SuperHeroSex;
    document.getElementById("hero-description").value = hero.SuperHeroDescription;
    document.getElementById("hero-planet").value = hero.HomePlanetUuid;
    document.getElementById("hero-city").value = hero.ProtectedCityUuid || "";
    document.getElementById("hero-squad").value = hero.SquadUuid || "";
}

async function updateHero() {
    const heroForm = document.getElementById("hero-form");
    const heroUuid = heroForm["hero-uuid"].value;

    const updatedHero = {
        SuperHeroUuid: heroUuid
    };
    if (heroForm["hero-name"].value.trim()) updatedHero.SuperHeroName = heroForm["hero-name"].value.trim();
    if (heroForm["hero-sex"].value.trim()) updatedHero.SuperHeroSex = heroForm["hero-sex"].value.trim();
    if (heroForm["hero-description"].value.trim()) updatedHero.SuperHeroDescription = heroForm["hero-description"].value.trim();
    if (heroForm["hero-planet"].value.trim()) updatedHero.HomePlanetUuid = heroForm["hero-planet"].value.trim();
    if (heroForm["hero-city"].value.trim()) updatedHero.ProtectedCityUuid = heroForm["hero-city"].value.trim();
    if (heroForm["hero-squad"].value.trim()) updatedHero.SquadUuid = heroForm["hero-squad"].value.trim();

    if (Object.keys(updatedHero).length === 0) {
        alert("Aucune modification apportée.");
        return;
    } else {
        socket.emit("modificationHero", updatedHero);
    }

}
