var {Server} = require("socket.io"); 
var User = require("./user");
var Hero = require("./create_hero");
var City = require("./city");
var Planet = require("./planet");

/**
*   The manager class will manage the reception of all incoming socket requests from clients
*   and redirect them to the appropriate class to make API requests and send responses to the client.
*/
class Manager{
    user = new User();
    superHero = new Hero();
    city = new City();
    planet = new Planet();
    io;

    constructor(serveur) {
        // Initialise the socket.io class of the server
        this.io = new Server(serveur);

        // This section is used to interact with any client, one by one
        this.io.on("connection", (socket) => {
            console.info(`Client connected [id=${socket.id}]`);
            console.log(this.io.sockets.server.engine.clientsCount);
            
            // User-related events
            socket.on("newUser", userinfo => {
                this.user.CreateNewUser(userinfo, socket);
            });

            socket.on("userCon", userinfo => {
                this.user.UserConnection(userinfo, socket);
            });

            socket.on("CheckUserUuid", UserUuid => {
                this.user.UserCheckConection(UserUuid, socket);
            });
            
            socket.on("UserDel", userinfo => {
                this.user.UserDel(userinfo, socket);
            });

            socket.on("UserUpdate", userinfo => {
                this.user.UserModif(userinfo, socket);
            });

            socket.on("newHero", heroInfo => {
                this.superHero.CreateNewHero(heroInfo, socket);
            });

            socket.on("newCity", cityInfo => {
                this.city.CreateNewCity(cityInfo, socket);
            });

            socket.on("newPlanet",planetInfo => {
                this.planet.CreateNewPlanet(planetInfo, socket);
            });
            
            
    

          
        });
    }

    /**
     * The method used to get the instance of the manager, 
     * or create it if it doesn't exist.
     */
    static getInstance(serveur) {
        if (!this.instance) {
          this.instance = new Manager(serveur);
        }
        return this.instance;
    }
}

module.exports = Manager;
