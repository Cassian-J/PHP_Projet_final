import { getCookie } from "./cookies.js";
const userUuid = getCookie("UserUuid");
document.addEventListener("DOMContentLoaded", async () => {
    if (!userUuid) {
        alert("Utilisateur non authentifié !");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/api/super_hero?userUuid=${userUuid}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des héros.");

        const heroes = await response.json();
        displayHeroes(heroes);
    } catch (error) {
        console.error("Erreur:", error);
        document.getElementById("heroes-container").innerHTML = "<p>Erreur lors du chargement des héros.</p>";
    }
});

function displayHeroes(heroes) {
    const container = document.getElementById("heroes-container");
    container.innerHTML = "";

    if (heroes.length === 0) {
        container.innerHTML = "<p>Aucun héros trouvé.</p>";
        return;
    }

    heroes.forEach(hero => {
        const heroDiv = document.createElement("div");
        heroDiv.classList.add("hero-card");
        
        heroDiv.innerHTML = `
            <h2>${hero.SuperHeroName}</h2>
            <p><strong>Sexe:</strong> ${hero.SuperHeroSex}</p>
            <p><strong>Description:</strong> ${hero.SuperHeroDescription}</p>
            <p><strong>Planète d'origine:</strong> ${hero.HomePlanetUuid}</p>
            <p><strong>Ville protégée:</strong> ${hero.ProtectedCityUuid || "N/A"}</p>
            <p><strong>Escouade:</strong> ${hero.SquadUuid || "N/A"}</p>
            <button class="modification" data-hero-uuid="${hero.SuperHeroUuid}">Modifier</button>
            <button class="delete" data-hero-uuid="${hero.SuperHeroUuid}">delete</button>
        `;

        container.appendChild(heroDiv);
    });

    document.querySelectorAll(".modification").forEach(button => {
        button.addEventListener("click", function() {
            const heroUuid = this.getAttribute("data-hero-uuid");
            modifyHero(heroUuid);
        });
    });
    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", function() {
            const heroUuid = this.getAttribute("data-hero-uuid");
            const heroInfo={
                SuperHeroUuid :heroUuid,
                UserUuid : userUuid
            }
            socket.emit("deleteHero",heroInfo)
        });
    });
}

function modifyHero(heroUuid) {
    document.cookie = "heroUuid=" + heroUuid;
    window.location.href = "/modifhero";
}


        
    