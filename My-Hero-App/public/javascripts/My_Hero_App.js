import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

// this section of code is used t ocheck if the client have 
// a valable user uuid
var UserUuid = getCookie("UserUuid");
socket.emit("CheckUserUuid", UserUuid);

socket.on("UserError", message => {
    alert(message);
    document.location.href="/";
});

function getCookie(name) {
    const cookies = document.cookie.split('; ')
    const value = cookies
        .find(c => c.startsWith(name + "="))
        ?.split('=')[1]
    if (value === undefined) {
        document.location.href="/";
        return null;
    } 
    return decodeURIComponent(value)
}
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

//