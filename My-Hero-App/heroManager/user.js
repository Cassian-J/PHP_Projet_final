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
                console.error("Error, there is no user with this mail");
                socket.emit("Error", "there is no user with this mail");
                return;
            }
            if (!userinfo.UserPwd || !user.UserPwd) {
                console.error("Error, empty password");
                socket.emit("Error", "Error, empty password");
                return;
            }
    
            bcrypt.compare(userinfo.UserPwd, user.UserPwd, (err, result) => {
                if (err) {
                    console.error('Error bcrypt.compare :', err);
                    socket.emit("Error", "Password dosen't match");
                } else if (result) {
                    socket.emit("EmitUuid", user.UserUuid);
                } else {
                    socket.emit("Error", "Password dosen't match");
                }
            });
        })
        .catch(error => {
            console.error('Error during the request:', error);
            socket.emit("Error", "Error during the request");
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
            return response.json();
        })
        .then(data => {
            const user = data.find(u => u.UserUuid === UserUuid);
            const toSend = {
                UserName : user.UserName,
                UserFirstName : user.UserFirstName,
                UserMail: user.UserMail
            }
            socket.emit("profilInfo", toSend);
        })
        .catch(error => socket.emit("UserError","user not found"));
    }

/** 
 * method used to update the user information
*/
    async UserModif(userinfo, socket) {
        if (userinfo.UserPwd == "") {
            console.error("Error, empty password");
            socket.emit("Error", "Error, empty password");
        }
        if(userinfo.UserUuid == "" || userinfo.UserPwd == "") {
            socket.emit("Error", "the uuid or the password are empty");
            return;
        };
        fetch(this.apiurl + "?UserUuid="+userinfo.UserUuid, {
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
            const user = data.find(u => u.UserUuid === userinfo.UserUuid);
    
            if (!user) {
                console.error("Error, there is no user with this uuid");
                socket.emit("Error", "there is no user with this uuid");
                return;
            }
    
            bcrypt.compare(userinfo.UserPwd, user.UserPwd, async (err, result) => {
                if (err) {
                    console.error('Error bcrypt.compare :', err);
                    socket.emit("Error", "Password dosen't match");
                } else if (result) {
                    const toSend = {
                        UserName : '',
                        UserFirstName : '',
                        UserPwd: "",
                        UserMail: ""
                    }
                    
                    for (const [key, value] of Object.entries(userinfo)) {
                        if (key === "NewUserPwd" || key === "UserPwd") {
                            if (key === "NewUserPwd" && value !== "") {
                                toSend.UserPwd = value;
                            } else if (key === "UserPwd" && !toSend.UserPwd) {
                                toSend.UserPwd = user.UserPwd;
                            }
                        } else {
                            toSend[key] = value !== "" ? value : user[key];
                        }
                    }
                    
                    if (toSend.UserPwd !== user.UserPwd){
                        const salt = await bcrypt.genSalt(this.saltRounds);
                        toSend.UserPwd = await bcrypt.hash(toSend.UserPwd, salt);
                    }
            
                    //send modification to the api
                    fetch(this.apiurl +"/"+ userinfo.UserUuid,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(toSend),
                    })
                    .then(response => {
                        if (!response.ok) {
                            socket.emit("Error", "This user dosen't exist");
                            return;
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        socket.emit("UserModificationSuccess", true);
                    })
                    .catch(error => {
                        console.error('Error during the request:', error.message);
                        socket.emit("Error", error.message);
                    });

                } else {
                    socket.emit("Error", "Password dosen't match");
                }
            });
        })
        .catch(error => {
            console.error('Error during the request:', error);
            socket.emit("Error", "Error during the request");
        });
    }

/** 
 * method used to delete an user
*/
    async UserDel(userinfo, socket) {
        if(userinfo.UserPwd == "") {
            socket.emit("Error", "the password canot be empty");
            return;
        };

        fetch(this.apiurl + "?UserUuid="+userinfo.UserUuid, {
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
            const user = data.find(u => u.UserUuid === userinfo.UserUuid);
    
            if (!user) {
                console.error("Error, user not found");
                socket.emit("Error", "user not found");
                return;
            }
            if (!userinfo.UserPwd || !user.UserPwd) {
                console.error("Error, empty password");
                socket.emit("Error", "empty password");
                return;
            }
    
            bcrypt.compare(userinfo.UserPwd, user.UserPwd, (err, result) => {
                if (err) {
                    console.error('Erreur bcrypt.compare :', err);
                    socket.emit("Error", "Error during password comparaison");
                } else if (result) {
                    fetch(this.apiurl + "/"+userinfo.UserUuid, {
                        method: "DELETE"
                      })
                      .then(response => {
                        if (!response.ok) {
                            console.log('Error:', response);
                            socket.emit("Error", "Error during conection");
                            return;
                        } else {
                          return response.json();
                        }
                      })
                      .then(data => {
                        if (data) {
                            console.log(`User sucefuly deleted`);
                            socket.emit('UserSucefulyDelete', true);
                            return;
                        }
                      })
                      .catch(error => {
                        console.error('Error:', error);
                        socket.emit("Error", error);
                        return;
                      });
                } else {
                    socket.emit("Error", "Password dosen't match");
                    return;
                }
            });
        })
        .catch(error => {
            console.error('Error during the request :', error);
            socket.emit("Error", "Error during the request");
            return;
        });
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