document.getElementById("createHero").onclick = function() {
    const heroInfo = {
        SuperHeroName: document.getElementById("superHeroName").value,
        SuperHeroDescription: document.getElementById("superHeroDescription").value,
        SuperHeroSex: document.getElementById("superHeroSex").value,
        
    };
    if (heroInfo.SuperHeroName !== "" && heroInfo.SuperHeroDescription !== "" && heroInfo.SuperHeroSex !== "") {
        window.socket.emit("newHero", heroInfo);
    } else {
        alert("Remplissez tous les champs");
        return;
    }

}

socket.on("HeroCréationSucess", sucess => {
    document.location.href="/My_Hero_App";
});

socket.on("Error", error => {
    alert(error);
});