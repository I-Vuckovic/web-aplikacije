import {timer, interval, fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import Ticket from "./ticket";


export default class Match {

    static drawMainDiv(match){

        let mainDiv = document.createElement("div");
        mainDiv.className = "matchDiv";
        mainDiv.id = "matchDiv";

        let title = document.createElement("p");
        title.className = "matchTitle";
        title.innerHTML = match.homeTeam + " vs " + match.awayTeam;
        mainDiv.appendChild(title);

        let choisesDiv = document.createElement("div");
        choisesDiv.className = "choisesDiv";
        mainDiv.appendChild(choisesDiv);

        let choices = ["1", "X", "2"];
        choices.forEach( choice => {
            let label = document.createElement("label");
            label.innerHTML = choice;
            label.style.width = "33%";
            label.style.textAlign = "center";
            choisesDiv.appendChild(label);
        })

        let oddsDiv = document.createElement("div");
        oddsDiv.className = "oddsDiv";
        mainDiv.appendChild(oddsDiv);

        let homeTeamOdd = document.createElement("button");
        homeTeamOdd.innerHTML = match.homeTeamOdd;
        oddsDiv.appendChild(homeTeamOdd);

        let drawOdd = document.createElement("button");
        drawOdd.innerHTML = match.drawOdd;
        oddsDiv.appendChild(drawOdd);

        let awayTeamOdd = document.createElement("button");
        awayTeamOdd.innerHTML = match.awayTeamOdd;
        oddsDiv.appendChild(awayTeamOdd);

        return mainDiv;
    }

    static drawTableRow(match) {
        let row = document.createElement("tr");
        row.className = "matchRow";
        let column = document.createElement("td");
        column.innerHTML = match.homeTeam + " vs " + match.awayTeam;
        row.appendChild(column);

        column = document.createElement("td");
        column.style.width = "75px";
        let matchTime = timer(1000, 1000).pipe(
            map( value => {
                let minutes = parseInt(value / 60);
                
                return minutes.toString() + " : " + (value%60).toString();
            })
        )
        row.appendChild(column);
        
        matchTime.subscribe( time => {
            column.innerHTML = time;
        })

        let scoreHome = document.createElement("td");
        scoreHome.innerHTML = 0;
        scoreHome.style.width = "50px";
        let scoreAway = document.createElement("td");
        scoreAway.style.width = "50px";
        scoreAway.innerHTML = 0;
        
        timer(100000).subscribe( value => {
            if(Math.random() * 100 < 15){
                let currentScore = parseInt(scoreHome.innerHTML);
                currentScore += 1;
                scoreHome.innerHTML = currentScore;
            }
        })

        timer(100000).subscribe( value => {
            if(Math.random() * 100 < 15){
                let currentScore = parseInt(scoreAway.innerHTML);
                currentScore += 1;
                scoreAway.innerHTML = currentScore;
            }
        })

        row.appendChild(scoreAway);
        row.appendChild(scoreHome);


        
        row.appendChild(this.drawOdd(match.homeTeamOdd, match.id));
        row.appendChild(this.drawOdd(match.drawOdd, match.id));
        row.appendChild(this.drawOdd(match.awayTeamOdd, match.id));

        return row;

    }

    static drawOdd(value, id){
        let odd = document.createElement("td");
        odd.className = "choice";
        odd.id = "odd";
        odd.innerHTML = value;

        fromEvent(odd, "click").subscribe( (val) => {
            Ticket.addMatch(id, val.target.innerHTML);
        })
        return odd;
    }

    static matchTable(category){
        let sportTable = document.createElement("table");
        sportTable.style.width = "100%";
        sportTable.className = "sportTable";
        let tableHeader = document.createElement("tr");
        tableHeader.className = "tableTitle";
        let tableTitle = document.createElement("th");
        tableTitle.innerHTML = category;
        tableHeader.appendChild(tableTitle);
        sportTable.id = category.toLowerCase();
        sportTable.appendChild(tableHeader);

        return sportTable;
    }
}