const { Server } = require("socket.io");
const { v4 } = require('uuid');

class City {
    apiurl = "http://localhost:8000/api/city";

    async createCity(cityInfo, socket) {
        try {
            cityInfo.CityUuid = v4();

            const response = await fetch(this.apiurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityInfo),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to create city: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(data, cityInfo);
            socket.emit("CityCreationSuccess", true);
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }

    async getAllCity(userUuid, socket) {
        try {
            if (!userUuid) throw new Error("UserUuid is required");
            
            const response = await fetch(`${this.apiurl}?UserUuid=${userUuid}`);
            if (!response.ok) throw new Error("Failed to fetch cities");
            const data = await response.json();
            socket.emit("CityFetched", data);
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }
    
    async deleteCity(data, socket) {
        try {
            if (!data.CityUuid || !data.UserUuid) throw new Error("CityUuid and UserUuid are required");
            
            const response = await fetch(`${this.apiurl}/${data.CityUuid}?UserUuid=${data.UserUuid}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Failed to delete city: ${response.status}`);
            }
            
            socket.emit("CityDeleted", true);
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }
}

module.exports = City;