import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();


document.getElementById("signUp").onclick = function() {document.location.href="/signup";};

// to clear the psw and to unclear it
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('pwd');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
  });

  document.getElementById('signIn').onclick = function () {
    const userinfo = {
      UserPwd: '',
      UserMail: ''
    };

    userinfo.UserMail = document.getElementById("userMailConn").value;
    userinfo.UserPwd = document.getElementsByID("pwdConn").value;
    
    socket.emit("userCon", userinfo);
  };