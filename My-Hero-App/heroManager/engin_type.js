const { v4 } = require('uuid');
const { Server } = require('socket.io');

class EnginType {
    apiurl = "http://localhost:8000/api/engin_type";

    async createEnginType(engineTypeInfo, socket) {
        try {
            if (!engineTypeInfo.EnginTypeName) {
                throw new Error("Engin Type Name is required");
            }
            engineTypeInfo.EnginTypeUuid = v4();
            
            fetch(this.apiurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(engineTypeInfo)
            })
            .then(data => {
                console.log(data,engineTypeInfo);
                socket.emit("engineTypeCreationSucess", true);
            })
            .catch (error => {throw new Error(error);});
        }catch (error) {
            socket.emit("Error", error);
        }
    }

    async getAllEnginTypes(userUuid, socket) {
        try {
            if (!userUuid) throw new Error("UserUuid is required");
            
            const response = await fetch(`${this.apiurl}?UserUuid=${userUuid}`);
            if (!response.ok) throw new Error("Failed to fetch engin types");
            const data = await response.json();
            socket.emit("EnginTypesFetched", data);
        } catch (error) {
            socket.emit("Error", error.message);
        }
    }
}


module.exports = EnginType;