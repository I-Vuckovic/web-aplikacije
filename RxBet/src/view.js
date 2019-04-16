//TODO:

//Izbaciti default vrednosti iz input polja na login stranici
//Omoguciti ponovo alert za uspesno prijavljivanje

import UserService from "./services/usersService";

export default class View{
    constructor(){
        this.mainDiv = document.getElementById("app");        
        this.drawLogin();
    }

    drawLogin(){

        let container = document.createElement("div");
        container.className = "container";

        let tittle = document.createElement("h2");
        tittle.innerHTML = "Welcome to RxBET";
        container.appendChild(tittle);

        let userNameInput = document.createElement("input");
        userNameInput.id = "userNameInput";
        userNameInput.value = "user1";
        container.appendChild(userNameInput);

        let passInput = document.createElement("input");
        passInput.id = "passwordInput";
        passInput.type = "password";
        passInput.value = "user1";
        container.appendChild(passInput);

        let loginButton = document.createElement("button");
        loginButton.innerHTML = "Login";
        loginButton.id = "submit";
        //loginButton.class = "btn btn-primary";
        loginButton.onclick = (ev) => this.login();
        container.appendChild(loginButton);

        let registerButton = document.createElement("button");
        registerButton.innerHTML = "Register";
        registerButton.id = "loginRegister";
        registerButton.onclick = (ev) => this.registerScreen();
        container.appendChild(registerButton);
        
        this.mainDiv.appendChild(container);
    }

    registerScreen (){
        document.getElementById("submit").onclick = (ev) => this.register();
        document.getElementById("submit").innerHTML = "Register";
        document.getElementById("loginRegister").innerHTML = "Back to login";
        document.getElementById("loginRegister").onclick = (ev) => this.loginScreen();
    }

    loginScreen(){
        document.getElementById("submit").onclick = (ev) => this.login();
        document.getElementById("submit").innerHTML = "Login";
        document.getElementById("loginRegister").innerHTML = "Register";
        document.getElementById("loginRegister").onclick = (ev) => this.registerScreen();
    }

    login(){
        let user = {
            username: document.getElementById('userNameInput').value,
            password: document.getElementById("passwordInput").value
        }

        UserService.checkLoginInfo(user)
        .then(() =>{
            this.successfulLogin();
        })
        .catch(err => console.log(err))
    }

    successfulLogin() {
        let elements = document.getElementsByClassName("container");
        elements[0].style.visibility = "hidden";
    }

    register(){

        let newUser = {
            username: document.getElementById("userNameInput").value,
            password: document.getElementById("passwordInput").value
        }

        UserService.registerNewUser(newUser)
        .then(()=>{
            this.loginScreen();
        })
        .catch(err => console.log(err))
    }

}