var {Server} = require("socket.io");
var {v4} = require('uuid');

class Planet{
    apiurl = "http://localhost:8000/api/planet";
 
    async CreateNewPlanet(planetInfo, socket) {
        try {
            if (!this.validateCityData(planetInfo)){
                throw new Error("Error the information format did'nt match with the require");
            }

            planetInfo.PlanetUuid = v4();

            fetch(this.apiurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(planetInfo),
            })
            .then(data => {
                console.log(data,planetInfo);
                socket.emit("PlanetCréationSucess", true);
            })
            .catch(error => {throw new Error(error);});

        } catch (error) {
            socket.emit("Error", error);
        }
    }

    validateHeroData(planetData){
        if (typeof planetData !== 'object' || planetData === null) {
            return false;
        }
    }

    // SendPlanet(PlanetUuid,socket) {
    //     fetch(this.apiurl +"?PlanetUuid="+ PlanetUuid, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             socket.emit("PlanetError","This city dosent exit")
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         const planet = data.find(u => u.PlanetUuid === PlanetUuid);
    //         const toSend = {
    //             PlanetName : planet.PlanetName,
                
    //         }
    //         socket.emit("planetInfo", toSend);
    //     })
    //     .catch(error => socket.emit("CityError","user not found"));
    // }
}


module.exports = Planet; 
        