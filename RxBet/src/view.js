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
        loginButton.id = "login";
        //loginButton.class = "btn btn-primary";
        loginButton.onclick = (ev) => this.login();
        container.appendChild(loginButton);

        let registerButton = document.createElement("button");
        registerButton.innerHTML = "Register";
        registerButton.id = "loginRegister";
        container.appendChild(registerButton);
        
        this.mainDiv.appendChild(container);
    }

    login(){

        let userName = document.getElementById('userNameInput');
        let pass = document.getElementById("passwordInput");

        let user = {
            username: userName.value,
            password: pass.value
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

}