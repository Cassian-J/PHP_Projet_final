import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

if (document.cookie.includes("UserUuid")) {
    document.location.href = "/My_Hero_App";
}
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
        UserName : document.getElementById("userName").value,
        UserFirstName : document.getElementById("userFirstName").value,
        UserPwd: '',
        UserMail: document.getElementById("userMail").value
    };
    var pwd1 = document.getElementById("passwordSignUp").value;
    var pwd2 = document.getElementById("passwordSignUp2").value;
    if (pwd1 == pwd2) {
        userinfo.UserPwd = pwd1;
    } else {
        alert("Pasword need to be the same")
    }

    socket.emit("newUser", userinfo);
};

socket.on("EmitUuid", (UserUuid) => {
    document.cookie = `UserUuid=${UserUuid}; path=/`;
    document.location.href = "/My_Hero_App";
});

socket.on("Error", (message) => alert(message));