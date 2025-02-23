
document.getElementByIdr("create").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const superheroInfo = {
        SuperHeroName: document.querySelector("[name='SuperHeroName']").value.trim(),
        SuperHeroSex: document.querySelector("[name='SuperHeroSex']").value,
        SuperHeroDescription: document.querySelector("[name='SuperHeroDescription']").value.trim()
    };

    console.log("Sending hero data:", superheroInfo); 
    socket.emit("newSuperHero", superheroInfo);
});

socket.on("SuperHeroCreationSuccess", (success) => {
    console.log("Creation success response:", success);
    alert("Superhero created successfully!");
    document.location.href = "/My_Hero_App";
});

socket.on("Error", (error) => {
    console.error("Received error:", error); 
    alert(error);
});