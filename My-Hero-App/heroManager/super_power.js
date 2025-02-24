const { v4 } = require('uuid');
const { Server } = require('socket.io');

class SuperPower {
    apiurl = "http://localhost:8000/api/super_power";

    
    async createSuperPower(superpowerInfo, socket) {
        try {
            if (!superpowerInfo.SuperPowerName || !superpowerInfo.SuperPowerDescription || !superpowerInfo.UserUuid) {
                throw new Error("SuperPowerName, SuperPowerDescription, and UserUuid are required");
            }
            superpowerInfo.SuperPowerUuid = v4();
            
            fetch(this.apiurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(superpowerInfo)
            })
            .then(data => {
                console.log(data,superpowerInfo);
                socket.emit("SuperPowerCreated", true)
            })
            .catch (error => {throw new Error(error);});
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }

    async getAllSuperPowers(userUuid, socket) {
        try {
            if (!userUuid) throw new Error("UserUuid is required");
            
            const response = await fetch(`${this.apiurl}?UserUuid=${userUuid}`);
            if (!response.ok) throw new Error("Failed to fetch super powers");
            const data = await response.json();
            socket.emit("SuperPowersFetched", data);
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }
    async deleteSuperPower(data, socket) {
        try {
            if (!data.SuperPowerUuid || !data.UserUuid) throw new Error("SuperPowerUuid and UserUuid are required");
            
            fetch(`${this.apiurl}/${data.SuperPowerUuid}?UserUuid=${data.UserUuid}`, {
                method: 'DELETE'
            })
            .then(socket.emit("SuperPowerDeleted", true))
            .catch(error => {throw new Error(error);})
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }
}

module.exports = SuperPower;
