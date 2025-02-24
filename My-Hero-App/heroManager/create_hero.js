var {Server} = require("socket.io");
var {v4} = require('uuid');

class Hero {
    apiurl = "http://localhost:8000/api/super_hero";

    async CreateNewHero(heroInfo, socket) {
        try {
            if (!this.validateHeroData(heroInfo)){
                throw new Error("Error the information format did'nt match with the require");
            }

            heroInfo.SuperHeroUuid = v4();

            fetch(this.apiurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(heroInfo),
            })
            .then(data => {
                console.log(data,heroInfo);
                socket.emit("HeroCréationSucess", true);
            })
            .catch(error => {throw new Error(error);});

        } catch (error) {
            socket.emit("Error", error);
        }
    }

    validateHeroData(heroData){
        if (typeof heroData !== 'object' || heroData === null) {
            return false;
        }

        const requiredProperties = ["SuperHeroName", "SuperHeroDescription", "SuperHeroSex"];
        for (const property of requiredProperties) {
            if (!((property in heroData))) {
                return false;
            }

            switch (property) {
                case "SuperHeroName":
                    if (typeof heroData[property] !== 'string' || heroData[property] == "") {
                        return false;
                    }
                    break;
                case "SuperHeroDescription":
                    if (typeof heroData[property] !== 'string' || heroData[property] == "") {
                        return false;
                    }
                    break;
                case "SuperHeroSex":
                    if (typeof heroData[property] !== 'string' || heroData[property] == "") {
                        return false;
                    }
                    break;
                default:
                   break;
            }
        }
        return true;
    }
}

module.exports = Hero;