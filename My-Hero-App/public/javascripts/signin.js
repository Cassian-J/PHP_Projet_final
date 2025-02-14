import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();

if (document.cookie.includes("UserUuid")) {
  document.location.href = "/My_Hero_App";
}

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
  userinfo.UserPwd = document.getElementById("pwdConn").value;
  if(userinfo.UserMail !== "" && userinfo.UserPwd !== "") {
    socket.emit("userCon", userinfo);
  } else {
    alert("empty user mail or password")
  }
};

socket.on("EmitUuid", UserUuid => {
  document.cookie = "UserUuid="+UserUuid;
  document.location.href="/My_Hero_App"
});

socket.on("Error", message => {
  alert(message);
});