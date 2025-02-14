var {Server} = require("socket.io");
var {v4} = require('uuid');
const bcrypt = require('bcrypt');

/**
*  the User class manage all api request for user table
*/
class User{
    saltRounds = 10;
    apiurl = "http://localhost:8000/api/users";

/**
 * methode to create an user, send all information about the user to the api
 */
    async CreateNewUser(userinfo, socket) {
        try {
            
            if (!this.validateUserData(userinfo)){
                throw new Error("Error the information format did'nt match with the require");
            }

            const salt = await bcrypt.genSalt(this.saltRounds);
            userinfo.UserPwd = await bcrypt.hash(userinfo.UserPwd, salt);

            if (!this.validateUserData(userinfo)) {
                console.error("Error: Invalid user data format.");
                return;
            }
            
            userinfo.UserUuid = v4();

            fetch(this.apiurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userinfo),
            })
            .then(data => {
                console.log(data,userinfo);
                socket.emit("UserCréationSucess", true);
            })
            .catch(error => {throw new Error(error);});

        } catch (error) {
            socket.emit("Error", error);
        }
    }

/**
 * Method used to compare the password the user enter and the password
 * in the database, if the password match it send the user Uuid 
 * if the password dosent match it return a message error to the client
 */
    UserConnection(userinfo, socket) {
        if(userinfo.UserMail == "" || userinfo.UserPwd == "") {
            socket.emit("Error", "the mail or the password are empty");
            return;
        };
        fetch(this.apiurl + "?UserMail="+userinfo.UserMail, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                socket.emit("Error", "This user dosen't exist");
                return;
            }
            return response.json();
        })
        .then(data => {
            const user = data.find(u => u.UserMail === userinfo.UserMail);
    
            if (!user) {
                console.error("Erreur : Aucun utilisateur correspondant à cet email !");
                socket.emit("Error", "Utilisateur introuvable");
                return;
            }
            if (!userinfo.pwdConn || !user.UserPwd) {
                console.error("Erreur : Le mot de passe est manquant !");
                socket.emit("Error", "Données incorrectes");
                return;
            }
    
            bcrypt.compare(userinfo.pwdConn, user.UserPwd, (err, result) => {
                if (err) {
                    console.error('Erreur bcrypt.compare :', err);
                    socket.emit("Error", "Erreur de comparaison des mots de passe");
                } else if (result) {
                    socket.emit("EmitUuid", user.UserUuid);
                } else {
                    socket.emit("Error", "Le mot de passe ne correspond pas");
                }
            });
        })
        .catch(error => {
            console.error('Erreur durant la requête :', error);
            socket.emit("Error", "Erreur durant la requête");
        });
    }

/** 
 * method used to check if the user Uuid exist,
 * if it dosent exist return an erorr,
 * nothing if the user exist.
*/
    UserCheckConection(UserUuid,socket) {
        fetch(this.apiurl +"?UserUuid="+ UserUuid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                socket.emit("UserError","This user dosent exit")
            }
        })
        .catch(error => socket.emit("UserError",error));

    }

    UserModif(userinfo) {

    }

    UserDel(hashpsw) {

    }
/**
 * a method to see if user information match to the object needed 
 */
    validateUserData(userData) {
        if (typeof userData !== 'object' || userData === null) {
            return false;
        }
    
        const requiredProperties = ['UserName', 'UserFirstName', 'UserPwd', 'UserMail'];
        for (const property of requiredProperties) {
            if (!(property in userData)) {
                return false; 
            }
            switch (property) {
                case 'UserName':
                    if (typeof userData[property] !== 'string' || userData[property] == "") {
                        return false; 
                    }
                    break;
                case 'UserFirstName':
                    if (typeof userData[property] !== 'string' || userData[property] == "") {
                        return false; 
                    }
                    break;
                case 'UserMail':
                    if (typeof userData[property] !== 'string' || !userData[property].includes('@')) {
                        return false; 
                    }
                    break;
                case 'UserPwd':
                    if (typeof userData[property] !== 'string' || userData[property] == "") {
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


module.exports = User;