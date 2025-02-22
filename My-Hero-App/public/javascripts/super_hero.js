import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";


// Ajout de la logique de soumission du formulaire Superhero
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche la soumission classique du formulaire

    const superheroInfo = {
        SuperHeroName: document.querySelector("[name='SuperHeroName']").value.trim(),
        SuperHeroSex: document.querySelector("[name='SuperHeroSex']").value,
        SuperHeroDescription: document.querySelector("[name='SuperHeroDescription']").value.trim()
    };

    // Vérifie que tous les champs sont remplis
    if (!superheroInfo.SuperHeroName || !superheroInfo.SuperHeroSex || !superheroInfo.SuperHeroDescription) {
        alert("All fields are required!");
        return;
    }

    // Envoie les données au serveur via Socket.IO
    socket.emit("newSuperHero", superheroInfo);
});

// Quand la création du super-héros est réussie
socket.on("SuperHeroCreationSuccess", (success) => {
    alert("Superhero created successfully!");
    document.location.href = "/My_Hero_App";
});

// En cas d'erreur lors de la création
socket.on("Error", (error) => {
    alert(error);
});
