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
    async CreateNewHero(heroInfo, socket) {
        try {
            if (!this.validateHeroData(heroInfo)) {
                throw new Error("Error: The information format didn't match the requirements.");
            }

            heroInfo.SuperHeroUuid = v4();

            const response = await fetch(this.apiurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(heroInfo),
            });

            if (!response.ok) {
                throw new Error("Failed to create hero");
            }

            const data = await response.json();
            console.log("Hero created successfully:", data);
            socket.emit("SuperHeroCreationSuccess", true);
        } catch (error) {
            console.error("Error creating hero:", error.message);
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
