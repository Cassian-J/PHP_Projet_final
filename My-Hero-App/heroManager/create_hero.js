var {Server} = require("socket.io");
var {v4} = require('uuid');

class Hero {
    apiurl = "http://localhost:8000/api/super_hero";
    squadUrl = "http://localhost:8000/api/squad";
    superPowerUrl = "http://localhost:8000/api/super_power";
    planetUrl = "http://localhost:8000/api/planet";
    cityUrl = "http://localhost:8000/api/city";

    async CreateNewHero(heroInfo, socket) {
        try {
            console.log("Hero Info received:", heroInfo);

            if (!this.validateHeroData(heroInfo)) {
                throw new Error("Error: the information format didn't match with the required.");
            }

            const squadUuid = await this.getSquadUuid(heroInfo.autre.SquadName, heroInfo.superhero.UserUuid);
            const superPowerUuid = await this.getSuperPowerUuid(heroInfo.autre.SuperPowerName, heroInfo.superhero.UserUuid);
            const planetUuid = await this.getPlanetUuid(heroInfo.autre.PlanetName, heroInfo.superhero.UserUuid);
            const cityUuid = await this.getCityUuid(heroInfo.autre.CityName, heroInfo.superhero.UserUuid);
            console.log(squadUuid,superPowerUuid,planetUuid,cityUuid)
            if (!squadUuid || !superPowerUuid || !planetUuid || !cityUuid) {
                throw new Error("One or more required entities do not exist. Hero cannot be created.");
            }

            heroInfo.superhero.SquadUuid = squadUuid;
            heroInfo.superhero.SuperPowerUuid = superPowerUuid;
            heroInfo.superhero.HomePlanetUuid = planetUuid;
            heroInfo.superhero.ProtectedCityUuid = cityUuid;
            heroInfo.superhero.SuperHeroUuid = v4();

            const response = await fetch(this.apiurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(heroInfo.superhero),
            });

            if (!response.ok) {
                throw new Error('Failed to create hero');
            }
            
            console.log("Hero created successfully", heroInfo.superhero);
            await this.linkHeroToPower(heroInfo.superhero.SuperHeroUuid, superPowerUuid);
            
            socket.emit("HeroCréationSucess", true);

        } catch (error) {
            console.error("Error in creating hero", error);
            socket.emit("Error", error.message);
        }
    }

    async getSquadUuid(squadName,userUuid) {
        try {
            const response = await fetch(this.squadUrl);
            const squads = await response.json();
            let squad = squads.find(s => s.SquadName === squadName && s.UserUuid===userUuid);
            
            return squad ? squad.SquadUuid : null;
        } catch (error) {
            throw new Error("Failed to check squad: " + error.message);
        }
    }

    async getSuperPowerUuid(superPowerName,userUuid) {
        try {
            const response = await fetch(this.superPowerUrl);
            const superPowers = await response.json();
            let superPower = superPowers.find(sp => sp.SuperPowerName === superPowerName && sp.UserUuid===userUuid);

            return superPower ? superPower.SuperPowerUuid : null;
        } catch (error) {
            throw new Error("Failed to check superpower: " + error.message);
        }
    }

    async getPlanetUuid(planetName,userUuid) {
        try {
            const response = await fetch(this.planetUrl);
            const planets = await response.json();
            let planet = planets.find(p => p.PlanetName === planetName && p.UserUuid===userUuid);

            return planet ? planet.PlanetUuid : null;
        } catch (error) {
            throw new Error("Failed to check planet: " + error.message);
        }
    }

    async getCityUuid(cityName,userUuid) {
        try {
            const response = await fetch(this.cityUrl);
            const cities = await response.json();
            let city = cities.find(c => c.CityName === cityName && c.UserUuid===userUuid);

            return city ? city.CityUuid : null;
        } catch (error) {
            throw new Error("Failed to check city: " + error.message);
        }
    }

    validateHeroData(heroData) {
        if (typeof heroData !== 'object' || heroData === null) {
            return false;
        }
        return true; 
    }

    async linkHeroToPower(superHeroUuid, superPowerUuid) {
        const linkinfo={
            SuperHeroUuid: superHeroUuid,
            SuperPowerUuid: superPowerUuid,
        }
        try {
            const response = await fetch("http://localhost:8000/api/superpower_superhero", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(linkinfo),
            });
    
            if (!response.ok) {
                throw new Error("Failed to link hero to superpower");
            }
    
            console.log("Hero linked to superpower successfully!");
        } catch (error) {
            console.error("Error linking hero to superpower:", error);
        }
    }
    
}

module.exports = Hero;
