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
    CreateNewUser(userinfo) {
        bcrypt.genSalt(this.saltRounds, (err, salt) => {
            if (err) {
                console.error("Error during the salt generation");
                return ;
            } else {
                bcrypt.hash(userinfo.UserPwd, salt, (err, hash) => {
                    if (err) {
                        console.error("Error during the hash generation");
                        return ;
                    } else {
                        userinfo.UserPwd = hash;
                    }
                });
            }
        });
        console.log(userinfo);
        if (!this.validateUserData(userinfo)){
            console.error("Error the information format did'nt match with the require");
            return ;
        }
        userinfo.UserUuid = v4();
        fetch(this.apiurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userinfo),
        })
        .then(data => console.log(data,userinfo))
        .catch(error => console.error('Error during the request:', error));
    }

    UserConection(userinfo, socket) {
        fetch(this.apiurl + "?UserMail="+userinfo.UserMail, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            bcrypt.compare(userinfo.pwdConn, data.UserPwd, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    socket.emit("Error", "Error comparing passwords");
                } else if (result) {
                    socket.emit("EmitUuid", userInformation.UserUuid);
                } else {
                    socket.emit("Error", "The password does not match");
                }
            });
        })
        .catch(error => {
            console.error('Error during the request:', error);
            socket.emit("Error", "Error during the request");
        });
    }

    UserCheckConection(UserUuid,socket) {
        fetch(this.apiurl + userinfo.UserMail, {
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
        .then(data => console.log(data))
        .catch(error => socket.emit("UserError",error));

    }

    UserModif(userinfo) {

    }

    UserDel(hashpsw) {

    }

//** a method to see if user information match to the object needed */
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
                case 'name':
                    if (typeof userData[property] !== 'string') {
                        return false; 
                    }
                    break;
                case 'email':
                    if (typeof userData[property] !== 'string' || !userData[property].includes('@')) {
                        return false; 
                    }
                    break;
                case 'password':
                    if (typeof userData[property] !== 'string') {
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