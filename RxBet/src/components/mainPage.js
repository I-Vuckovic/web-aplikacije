import Match from "./match"
import { fromEvent } from "rxjs";
import UserService from "../services/usersService";

export default class MainPage{

    static drawPage(){

        let mainPageDiv = document.createElement("div");
        mainPageDiv.className = "mainPageDiv";
        mainPageDiv.id = "mainPageDiv";

        this.drawSideBar(mainPageDiv);

        let matchDiv = document.createElement("div");
        matchDiv.id= "matchDiv";
        mainPageDiv.appendChild(matchDiv);
        
        //mainPageDiv.appendChild(Match.drawMainDiv());

        let date = document.createElement("input");
        date.type = "date";
        date.id = "date";
        date.style.height = "100px";
        mainPageDiv.appendChild(date);

        return mainPageDiv;
    }

    static logout(){
        sessionStorage.removeItem("user");
        document.getElementById("mainPageDiv").style.visibility = "hidden";
        document.getElementById("startPage").style.visibility = "visible";
    }

    static drawSideBar(parent){

        let sideBar = document.createElement("div");
        sideBar.className = "sidebar";
        sideBar.id = "sidebar";

        const logout = this.drawSideBarButton(sideBar, "Logout");
        logout.onclick = (ev) => this.logout();

        const football = this.drawSideBarButton(sideBar, "Football");
        football.onclick = (ev) => {
            UserService.getMatches("football")
            .then(res => {
                document.getElementById("matchDiv").innerHTML = "";
                res.forEach(element => {
                document.getElementById("matchDiv").appendChild(Match.drawMainDiv());
            });
        })
        }

        const basketball = this.drawSideBarButton(sideBar, "Basketball");
        basketball.onclick = (ev) => {
            UserService.getMatches("basketball")
            .then(res => {
                document.getElementById("matchDiv").innerHTML = "";
                res.forEach(element => {
                document.getElementById("matchDiv").appendChild(Match.drawMainDiv());
            });
        })
        }
        

        parent.appendChild(sideBar);
    }

    static drawSideBarButton(parent, text){

        let logout = document.createElement("a");
        logout.innerHTML = text;
        logout.className = "button";
        parent.appendChild(logout);
        return logout;
    }

    static dateObservable(){

        fromEvent(document.getElementById("date"), "input").subscribe(val => {
            
        
        });
    }
    
}
