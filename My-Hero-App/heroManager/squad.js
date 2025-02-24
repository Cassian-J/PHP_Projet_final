const { v4 } = require('uuid');
const { Server } = require('socket.io');

class Squad {
    apiurl = "http://localhost:8000/api/squad";

    async createSquad(squadInfo, socket) {
        try {
            squadInfo.SquadUuid = v4();
            
            fetch(this.apiurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(squadInfo)
            })
            .then(data => {
                console.log(data,squadInfo);
                socket.emit("squadCreationSucess", true);
            })
            .catch (error => {throw new Error(error);});
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }

    async getAllSquads(userUuid, socket) {
        try {
            if (!userUuid) throw new Error("UserUuid is required");
            
            const response = await fetch(`${this.apiurl}?UserUuid=${userUuid}`);
            if (!response.ok) throw new Error("Failed to fetch squads");
            const data = await response.json();
            socket.emit("SquadsFetched", data);
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }

    async deleteSquad(data, socket) {
        try {
            if (!data.SquadUuid || !data.UserUuid) throw new Error("SquadUuid and UserUuid are required");
            
            fetch(`${this.apiurl}/${data.SquadUuid}?UserUuid=${data.UserUuid}`, {
                method: 'DELETE'
            })
            .then(socket.emit("SquadDeleted", true))
            .catch(error => {throw new Error(error);})
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }
}

module.exports = Squad;
