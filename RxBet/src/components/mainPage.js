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
        matchesContainer.id = "matchesContainer";

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
        document.getElementById("matchesContainer").style.visibility = "hiden";
        
    }

    static drawSideBar(parent){

        const sideBar = document.createElement("div");
        sideBar.className = "sidebar";
        sideBar.id = "sidebar";

        const logout = this.drawSideBarButton(sideBar, "Logout");
        logout.onclick = (ev) => this.logout();

        const football = this.drawSideBarButton(sideBar, "Football");
        football.onclick = (ev) => {
            this.getMatches("Football");
        }

        const basketball = this.drawSideBarButton(sideBar, "Basketball");
        basketball.onclick = (ev) => {
            this.getMatches("Basketball");
        }

        const all = this.drawSideBarButton(sideBar, "All");
        all.onclick = (ev) => {
            this.getMatches("");
        }
        
        const balanceDiv = document.createElement("div");
        balanceDiv.className = "balance";
        balanceDiv.id = "balance";
        balanceDiv.innerHTML = "Balance: " + sessionStorage.getItem("balance");
        sideBar.appendChild(balanceDiv); 

        const addBalance = this.drawSideBarButton(sideBar, "Add balance")
        addBalance.onclick = () => {
            let newBalance = parseInt(sessionStorage.getItem("balance")) + 100;
            sessionStorage.setItem("balance", newBalance);
            UserService.balanceChange(newBalance, sessionStorage.getItem("id"));
            this.updateBalance(newBalance);
        }

        parent.appendChild(sideBar);
    }

    static getMatches(matchCategory){
        
        let tables = document.getElementsByClassName("sportTable");
        Array.from(tables).forEach(el =>{
            el.parentElement.removeChild(el);
        })
        if (matchCategory == ""){
            matchesContainer.appendChild(Match.matchTable("Football"));
            matchesContainer.appendChild(Match.matchTable("Basketball"));
        }
        else{
            document.getElementById("matchesContainer").appendChild(Match.matchTable(matchCategory));
        }

        UserService.getMatches("matches")
        .then( res => {
            let filtered;
            if (matchCategory != ""){
                filtered =  res.filter( el => el.category == matchCategory.toLowerCase());
            }else{
                filtered = res;
            }

            filtered.forEach ( element => {
                document.getElementById(element.category).appendChild(Match.drawTableRow(element));
            })
        })
        .catch(err => console.log(err))
    }

    static drawSideBarButton(parent, text){

        let button = document.createElement("a");
        button.innerHTML = text;
        button.className = "button";
        parent.appendChild(button);
        return button;
    }

    static updateBalance(newBalance){
        document.getElementById("balance").innerHTML = `Balance: ${newBalance}`;
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
