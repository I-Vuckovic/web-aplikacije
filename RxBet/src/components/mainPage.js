import Match from "./match"
import { fromEvent } from "rxjs";
import {filter } from "rxjs/Operator";
import UserService from "../services/usersService";
import Ticket from "./ticket";

export default class MainPage{

    static drawPage(){

        let mainPageDiv = document.createElement("div");
        mainPageDiv.className = "mainPageDiv";
        mainPageDiv.id = "mainPageDiv";

        this.drawSideBar(mainPageDiv);

        let matchesContainer = document.createElement("div");
        matchesContainer.className = "matchesContainer";

        
        matchesContainer.appendChild(Match.matchTable("Football"));
        matchesContainer.appendChild(Match.matchTable("Basketball"));

        UserService.getMatches("matches")
        .then( res => {
            res.forEach ( element => {
                document.getElementById(element.category).appendChild(Match.drawTableRow(element));
            })
        })

        mainPageDiv.appendChild(matchesContainer);

        mainPageDiv.appendChild(Ticket.drawTicket());

        return mainPageDiv;
    }

    static logout(){
        sessionStorage.clear();
        document.getElementById("mainPageDiv").style.visibility = "hidden";
        document.getElementById("startPage").style.visibility = "visible";
        document.getElementById("matchesContainer").innerHTML = "";
        
    }

    static drawSideBar(parent){

        let sideBar = document.createElement("div");
        sideBar.className = "sidebar";
        sideBar.id = "sidebar";

        const logout = this.drawSideBarButton(sideBar, "Logout");
        logout.onclick = (ev) => this.logout();

        const football = this.drawSideBarButton(sideBar, "Football");
        football.onclick = (ev) => {
            this.getMatches("football");
        }

        const basketball = this.drawSideBarButton(sideBar, "Basketball");
        basketball.onclick = (ev) => {
            this.getMatches("basketball");
        }

        const all = this.drawSideBarButton(sideBar, "All");
        all.onclick = (ev) => {
            this.getMatches("");
        }
        

        parent.appendChild(sideBar);
    }

    static getMatches(matchCategory){
        
        let tables = document.getElementsByClassName("sportTable");
        Array.from(tables).forEach ( table => {
            if (table.id != matchCategory && matchCategory!= "")
                table.style.visibility = "hidden";
            else
                table.style.visibility = "visible";

        })
    }

    static drawSideBarButton(parent, text){

        let logout = document.createElement("a");
        logout.innerHTML = text;
        logout.className = "button";
        parent.appendChild(logout);
        return logout;
    }

    //Bilo je korisceno u prvobitnoj ideji vise nema koristi
    /* static dateObservable(){

        fromEvent(document.getElementById("date"), "input")
        .subscribe(val => {
            let filtered = [];
            if (this.matches && val.target.value){
                filtered = this.matches.filter( match =>  match.date < val.target.value);  
            }
            else{
                filtered = this.matches;
            }
            document.getElementById("matchDiv").innerHTML = "";
                filtered.forEach(element => {
                    document.getElementById("matchDiv").appendChild(Match.drawMainDiv(element));
                });
           
        });
    } */
    
}
