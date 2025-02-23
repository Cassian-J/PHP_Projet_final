var { Server } = require("socket.io");
var { v4 } = require("uuid");

/**
 * The SuperHero class manages all API requests for the super_hero table
 */
class SuperHero {
    constructor() {
        this.apiurl = "http://localhost:8000/api/super_hero";
    }

    /**
     * Method to create a new superhero and send the information to the API
     */
    async CreateNewHero(superheroInfo, socket) {
        try {
            if (!this.validateHeroData(superheroInfo)) {
                throw new Error("Error: The information format didn't match the requirements.");
            }
    
            superheroInfo.SuperHeroUuid = v4();
    
            const response = await fetch(this.apiurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                credentials: 'include',
                body: JSON.stringify(superheroInfo),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create hero");
            }
    
            const data = await response.json();
            console.log("Hero created successfully:", data);
            socket.emit("SuperHeroCreationSuccess", true);
        } catch (error) {
            console.error("Error creating hero:", error);
            socket.emit("Error", error.message);
        }
    }

    /**
     * Method to validate if hero information matches the required object structure
     */
    validateHeroData(heroData) {
        if (typeof heroData !== "object" || heroData === null) {
            return false;
        }

        const requiredProperties = ["SuperHeroName", "SuperHeroSex", "SuperHeroDescription"];
        return requiredProperties.every(prop => typeof heroData[prop] === "string" && heroData[prop].trim() !== "");
    }
}

module.exports = SuperHero;
