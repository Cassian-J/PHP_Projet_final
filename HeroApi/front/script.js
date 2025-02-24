// Ici, vous pouvez ajouter du JavaScript pour des fonctionnalités interactives, si nécessaire.
// Par exemple, vous pouvez ajouter une animation pour l'en-tête ou la gestion de la connexion utilisateur.

console.log("Bienvenue sur le site !");
document.querySelectorAll('.category-toggle').forEach(toggle => {
    toggle.addEventListener('change', function() {
      const subcategory = document.getElementById(this.dataset.target);
      if (this.checked) {
        subcategory.style.display = 'block';
      } else {
        subcategory.style.display = 'none';
        subcategory.querySelectorAll('input[type="checkbox"]').forEach(input => {
          input.checked = false;
        });
      }
    });
  });
const heroesData = {
  hero1: {
    name: "Héro 1",
    group: "Alpha",
    city: "Paris",
    powers: "Vol, Super force",
    weapons: "Épée, Arc",
    vehicles: "Moto",
    img: "image/hero1.jpg"
  },
  hero2: {
    name: "Héro 2",
    group: "Beta",
    city: "New York",
    powers: "Téléportation, Invisibilité",
    weapons: "Pistolet",
    vehicles: "Voiture",
    img: "image/hero2.jpg"
  },
  hero3: {
    name: "Héro 3",
    group: "Gamma",
    city: "Tokyo",
    powers: "Vitesse, Agilité",
    weapons: "Katana",
    vehicles: "Avion",
    img: "image/hero3.jpg"
  }
};

document.querySelectorAll('.hero-card').forEach(card => {
  card.addEventListener('click', function() {
    const heroId = this.getAttribute('data-hero');
    const hero = heroesData[heroId];

    document.getElementById('popup-hero-img').src = hero.img;
    document.getElementById('popup-hero-name').innerText = hero.name;
    document.getElementById('popup-hero-group').innerText = hero.group;
    document.getElementById('popup-hero-city').innerText = hero.city;
    document.getElementById('popup-hero-powers').innerText = hero.powers;
    document.getElementById('popup-hero-weapons').innerText = hero.weapons;
    document.getElementById('popup-hero-vehicles').innerText = hero.vehicles;

    document.getElementById('hero-popup').style.display = "flex";
  });
});

// Fermer le popup
document.querySelector('.close-btn').addEventListener('click', function() {
  document.getElementById('hero-popup').style.display = "none";
});

document.getElementById('hero-popup').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = "none";
  }
});  