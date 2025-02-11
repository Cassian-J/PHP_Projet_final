import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

// redirect to the signup page
document.getElementById("signIn").onclick = function() {document.location.href="/";};

// to clear the psw and to unclear it
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('pwd');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
});
document.getElementById('togglePassword2').addEventListener('click', function () {
    const passwordField = document.getElementById('pwd2');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
});

document.getElementById('signUp').onclick = function () {
    const userinfo = {
        UserName: '',
        UserFirstName: '',
        UserPwd: '',
        UserMail: ''
    };

    userinfo.UserName = document.getElementById("userName").value;
    userinfo.UserFirstName = document.getElementById("userFirstName").value;
    userinfo.UserMail = document.getElementById("userMail").value;

    var pwd1 = document.getElementById("passwordSignUp").value;
    var pwd2 = document.getElementById("passwordSignUp2").value;
    if (pwd1 == pwd2) {
        userinfo.UserPwd = pwd1;
    } else {
        alert("Pasword need to be the same")
    }

    socket.emit("newUser", userinfo);
    document.location.href="/";
};