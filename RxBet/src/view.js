//TODO:

//Izbaciti default vrednosti iz input polja na login stranici
//Omoguciti ponovo alert za uspesno prijavljivanje

import {take, filter, map, sampleTime, debounceTime, switchMap} from "rxjs/operators";
import {fromEvent} from "rxjs"
import UserService from "./services/usersService";
import MainPage from "./components/mainPage";

export default class View{
    constructor(){
        this.mainDiv = document.getElementById("app");      
        
        this.mainDiv.appendChild(MainPage.drawPage());
        this.drawLogin(this.mainDiv);

        if (sessionStorage.getItem("user") == null){
            document.getElementById("mainPageDiv").style.visibility = "hidden";
        }
        else{
            document.getElementById("startPage").style.visibility = "hidden";
        }
        
    }

    drawLogin(parent){

        let startPage = document.createElement("div");
        startPage.className = "startPage";
        startPage.id = "startPage";

        let tittle = document.createElement("h2");
        tittle.innerHTML = "Welcome to RxBET";
        startPage.appendChild(tittle);

        let userNameInput = document.createElement("input");
        userNameInput.id = "userNameInput";
        userNameInput.value = "user1";
        startPage.appendChild(userNameInput);

        let passInput = document.createElement("input");
        passInput.id = "passwordInput";
        passInput.type = "password";
        passInput.value = "user1";
        startPage.appendChild(passInput);

        let loginButton = document.createElement("button");
        loginButton.innerHTML = "Login";
        loginButton.id = "submit";
        //loginButton.class = "btn btn-primary";
        loginButton.onclick = (ev) => this.login();
        startPage.appendChild(loginButton);

        let registerButton = document.createElement("button");
        registerButton.innerHTML = "Register";
        registerButton.id = "loginRegister";
        registerButton.onclick = (ev) => this.registerScreen();
        startPage.appendChild(registerButton);
        
        parent.appendChild(startPage);
    }

    registerScreen (){
        document.getElementById("submit").onclick = (ev) => this.register();
        document.getElementById("submit").innerHTML = "Register";
        document.getElementById("loginRegister").innerHTML = "Back to login";
        document.getElementById("loginRegister").onclick = (ev) => this.loginScreen();

        this.registerObservable = fromEvent(document.getElementById("userNameInput"), 'input').pipe(
            sampleTime(1000),
            map( input =>{
                return UserService.checkUserNameExist(input.srcElement.value);
            })
        ).subscribe(val => {
            val.then((exists) => {
                if(exists){
                    document.getElementById("userNameInput").className = "userNameExists";
                }
                else{
                    document.getElementById("userNameInput").classList.remove("userNameExists");
                }
            })
        });
    }

    loginScreen(){
        document.getElementById("submit").onclick = (ev) => this.login();
        document.getElementById("submit").innerHTML = "Login";
        document.getElementById("loginRegister").innerHTML = "Register";
        document.getElementById("loginRegister").onclick = (ev) => this.registerScreen();

        document.getElementById("userNameInput").classList.remove("userNameExists");
        this.registerObservable.unsubscribe();
    }

    login(){
        let user = {
            username: document.getElementById('userNameInput').value,
            password: document.getElementById("passwordInput").value
        }

        UserService.checkLoginInfo(user)
        .then(() =>{
            sessionStorage.setItem("user", user.username);
            this.successfulLogin();
        })
        .catch(err => console.log(err))
    }

    successfulLogin() {
        let elements = document.getElementsByClassName("startPage");
        elements[0].style.visibility = "hidden";

        document.getElementById("mainPageDiv").style.visibility = "visible";
        
    }

    register(){

        let newUser = {
            username: document.getElementById("userNameInput").value,
            password: document.getElementById("passwordInput").value
        }

        UserService.registerNewUser(newUser)
        .then((exists)=>{
            if(!exists)
                this.loginScreen();
        })
        .catch(err => console.log(err))
    }


}