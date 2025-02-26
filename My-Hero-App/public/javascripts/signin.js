import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { getCookie } from "./cookies.js";

window.socket = io();

// cookie redirection
if (document.cookie.includes("UserUuid")) {
  if("" !== getCookie("UserUuid")) {
    document.location.href = "/My_Hero_App";
  }
}
//

document.getElementById("signUp").onclick = function() {document.location.href="/signup";};

// to clear the psw and to unclear it
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('pwd');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
  });

// add reaction to the signin buton,
// the reaction get and send information to the server 
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

// this part is used when a user sucefuly conected,
// the server send the user Uuid to add it to cookie
// useful you khow
socket.on("EmitUuid", UserUuid => {
  document.cookie = "UserUuid="+UserUuid;
  document.location.href="/My_Hero_App"
});

// if the server send an error mesage
socket.on("Error", message => {
  alert(message);
});