import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import {getCookie} from "cookies.js";

window.socket = io();

// this section of code is used t ocheck if the client have 
// a valable user uuid
var UserUuid = getCookie("UserUuid");
socket.emit("CheckUserUuid", UserUuid);

socket.on("UserError", message => {
    alert(message);
    document.cookie = "UserUuid=; path=/";
    document.location.href="/";
});
//

// set user information un profil
socket.on("profilInfo", userinfo => {
  document.getElementById("infoName").innerHTML = userinfo.UserName;
  document.getElementById("infoFirstName").innerHTML = userinfo.UserFirstName;
  document.getElementById("infoMail").innerHTML = userinfo.UserMail;
})
//

// to clear the psw and to unclear it
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('newPassword');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
});
document.getElementById('togglePassword2').addEventListener('click', function () {
    const passwordField = document.getElementById('newPassword2');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
});
//

// Popup gestion
document.getElementById('AcountPopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
  });
  
document.querySelector('.close-popup').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});

document.getElementById('ChangeUserInfo').addEventListener('click', function() {
  document.getElementById('popup-change').style.display = 'block';
});

document.getElementById('UserDel').addEventListener('click', function() {
    document.getElementById('popup-del').style.display = 'block';
});

document.querySelector('.close-del').addEventListener('click', function() {
  document.getElementById('popup-del').style.display = 'none';
});

document.querySelector('.close-change').addEventListener('click', function() {
  document.getElementById('popup-change').style.display = 'none';
});
//

//
document.getElementById('SendUserDel').onclick = function () {
  const userinfo = {
    UserUuid : getCookie("UserUuid"),
    UserPwd : document.getElementById("pwdUserDel").value
  };
  if (userinfo.UserPwd == "") {
    alert("empty password");
    return;
  }

  socket.emit("UserDel", userinfo);
};

document.getElementById('SendChangeUserInfo').onclick = function () {
  const userinfo = {
    UserUuid : getCookie("UserUuid"),
    UserName : document.getElementById("userName").value,
    UserFirstName : document.getElementById("userFirstName").value,
    NewUserPwd: '',
    UserPwd: document.getElementById("pwdChangeUser").value,
    UserMail: document.getElementById("userMail").value
  };
  var pwd1 = document.getElementById("newPassword").value;
  var pwd2 = document.getElementById("newPassword2").value;
  if (pwd1 === pwd2) {
    userinfo.NewUserPwd = pwd1;
  } else {
    alert("Pasword need to be the same");
    return;
  }

  if (userinfo.UserPwd == "") {
    alert("empty password")
  } else {
    socket.emit("UserUpdate", userinfo);
  }
};

// when the user are sucefuly updated
socket.on("UserSucefulyUpdated", sucess => {
  document.location.href="/";
});

// when the user are sucefuly deleted
socket.on("UserSucefulyDelete", sucess => {
  document.location.href="/";
});

// in case of error
socket.on("Error", error => {
  alert(error);
});
//