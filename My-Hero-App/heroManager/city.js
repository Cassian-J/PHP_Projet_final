var {Server} = require("socket.io");
var {v4} = require('uuid');

class City{
    apiurl = "http://localhost:8000/api/city";

    async CreateNewCity(cityInfo, socket) {
        try {
            if (!this.validateCityData(cityInfo)){
                throw new Error("Error the information format did'nt match with the require");
            }

            cityInfo.CityUuid = v4();

            fetch(this.apiurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityInfo),
            })
            .then(data => {
                console.log(data,cityInfo);
                socket.emit("CityCréationSucess", true);
            })
            .catch(error => {throw new Error(error);});

        } catch (error) {
            socket.emit("Error", error);
        }
    }

    validateHeroData(cityData){
        if (typeof cityData !== 'object' || cityData === null) {
            return false;
        }
    }


    // SendCity(CityUuid,socket) {
    //     fetch(this.apiurl +"?CityUuid="+ CityUuid, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             socket.emit("CityError","This city dosent exit")
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         const city = data.find(u => u.CityUuid === CityUuid);
    //         const toSend = {
    //             CityName : city.CityName,
                
    //         }
    //         socket.emit("cityInfo", toSend);
    //     })
    //     .catch(error => socket.emit("CityError","user not found"));
    // }
}

module.exports = City; 
    