var {Server} = require("socket.io");
var {v4} = require('uuid');
/**
*  the User class manage all api request for user table
*/
class User{

    apiurl = "http://localhost:8000/api/users";
/**
 * methode to create an user, send all information about the user to the api
 */
    CreateNewUser(userinfo) {
        if (!this.validateUserData(userinfo)){
            console.error("Error the information format did'nt match with the require")
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
        .catch(error => console.error('Erreur lors de l\'envoi de la requête:', error));
    }

    UserConection(userinfo) {
        console.log(userinfo);
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