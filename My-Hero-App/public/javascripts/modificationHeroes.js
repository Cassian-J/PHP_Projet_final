import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { getCookie } from "./cookies.js";
window.socket = io();

document.addEventListener("DOMContentLoaded", async () => {
    const heroUuid = getCookie("heroUuid");


    if (!heroUuid) {
        alert("Aucun héros sélectionné !");
        window.location.href = "/My-Hero-App"; 
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/api/super_hero/${heroUuid}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération du héros.");

        const hero = await response.json();
        fillHeroForm(hero);
    } catch (error) {
        console.error("Erreur:", error);
        alert("Impossible de charger les informations du héros.");
    }

    
    document.getElementById("modifier").addEventListener("click", () => {
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

async function updateHero(heroUuid) {
    try {
        
        const heroName = document.getElementById("hero-name").value;
        const heroSex = document.getElementById("hero-sex").value;
        const heroDescription = document.getElementById("hero-description").value;
        const heroPlanet = document.getElementById("hero-planet").value;
        const heroCity = document.getElementById("hero-city").value;
        const heroSquad = document.getElementById("hero-squad").value;

        
        if (!heroName || !heroSex || !heroDescription || !heroPlanet) {
            alert("Veuillez remplir tous les champs obligatoires !");
            return;
        }


        const heroData = {
            SuperHeroName: heroName,
            SuperHeroSex: heroSex,
            SuperHeroDescription: heroDescription,
            HomePlanetUuid: heroPlanet,
            ProtectedCityUuid: heroCity || null,
            SquadUuid: heroSquad || null
        };

       
        const response = await fetch(`http://localhost:8000/api/super_hero/${heroUuid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(heroData)
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du héros.");
        }

        const updatedHero = await response.json();
        
        
        alert("Héros modifié avec succès !");
        
      
        window.socket.emit('hero-updated', updatedHero);
        window.location.href = `/My-Hero-App/hero/${heroUuid}`;
        
    } catch (error) {
        console.error("Erreur:", error);
        alert("Impossible de modifier le héros: " + error.message);
    }
}