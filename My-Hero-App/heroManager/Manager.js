var {Server} = require("socket.io");
var User =require("./user");
/**
*   The manager class willmanage the reception of all incomin socket request from clients
*   and redirect it to the apropriate class to make API request and send response to the client.
*/
class Manager{
    user = new User;
    io;

    constructor(serveur) {
        
        this.io = new Server(serveur);

        this.io.on("connection", (socket) => {
            console.info(`Client connected [id=${socket.id}]`);
            console.log(this.io.sockets.server.engine.clientsCount);
            
            //to add a response to a resquest
            //socket.on("",) => {}
            socket.on("newUser", userinfo => {
                this.user.CreateNewUser(userinfo);
            });

            socket.on("userCon", userinfo => {
                this.user.UserConection(userinfo);
            });
        })
    }

    static getInstance(serveur) {
        if (!this.instance) {
          this.instance = new Manager(serveur);
        }
        return this.instance;
    }
}

module.exports = Manager;