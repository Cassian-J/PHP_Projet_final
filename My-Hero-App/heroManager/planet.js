var {Server} = require("socket.io");
var {v4} = require('uuid');

class Planet{
    apiurl = "http://localhost:8000/api/planet";
 
    async createPlanet(planetInfo, socket) {
        try {

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


    async getAllPlanet(userUuid, socket) {
        try {
            if (!userUuid) throw new Error("UserUuid is required");
            
            const response = await fetch(`${this.apiurl}?UserUuid=${userUuid}`);
            if (!response.ok) throw new Error("Failed to fetch planet");
            const data = await response.json();
            socket.emit("PlanetFetched", data);
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }


    async deletePlanet(data, socket) {
        try {
            if (!data.PlanetUuid || !data.UserUuid) throw new Error("PlanetUuid and UserUuid are required");
            
            fetch(`${this.apiurl}/${data.PlanetUuid}?UserUuid=${data.UserUuid}`, {
                method: 'DELETE'
            })
            .then(socket.emit("PlanetDeleted", true))
            .catch(error => {throw new Error(error);})
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }

}

module.exports = Planet; 
        