import {timer, interval, fromEvent, from, of, Observable } from "rxjs";
import { map, takeUntil, take, debounce, debounceTime, filter } from "rxjs/operators";
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
        row.id = match.id;
        let column = document.createElement("td");
        column.innerHTML = match.id + ". " +  match.homeTeam + " vs " + match.awayTeam;
        row.appendChild(column);

        column = document.createElement("td");
        column.style.width = "75px";
        row.appendChild(column);

        let currentTime = match.time;

        if (currentTime < 2700){

            let matchTime = timer(1000, 1000).pipe(
                take(2710 - currentTime),
                map( value => {
                    value += currentTime;
                    let minutes = parseInt(value / 60);
                    
                    return minutes.toString() + " : " + (value%60).toString();
                }),
            )      

            matchTime.subscribe( time => {
                column.innerHTML = time;
            },
            err => console.log(err),
            () => {
                column.innerHTML = "Half time";
                this.halfTime(column, row);
            })
        }
        else{
            this.secondHalf(currentTime, column, row)
        }
        
        let scoreHome = document.createElement("td");
        scoreHome.innerHTML = 0;
        scoreHome.style.width = "50px";
        scoreHome.className = "score";
        let scoreAway = document.createElement("td");
        scoreAway.style.width = "50px";
        scoreAway.innerHTML = 0;
        scoreAway.className = "score";

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
        odd.style.width = "50px";

        fromEvent(odd, "click").pipe(
            debounceTime(200),
            filter(ev => !ev.target.classList.contains("finished"))
        ).subscribe( () => {
            Ticket.addMatch(id, odd.innerHTML);
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

    static halfTime(column, row){
        timer(1000, 1000).pipe(
            take(1500)
        ).subscribe(
            () => { row.classList.add("halftime")},
            err => console.log(err),
            () => this.secondHalf(2700, column, row)
        )
    }

    static secondHalf(currentTime, column, row){
        let matchTime = timer(1000, 1000).pipe(
            take(5410 - currentTime),
            map( value => {
                value += currentTime;
                let minutes = parseInt(value / 60);
                
                return minutes.toString() + " : " + (value%60).toString();
            }),
        )      

        matchTime.subscribe( 
            time => {column.innerHTML = time;},
            err => console.log(err),
            () => {
                column.innerHTML = "Match finished";
                row.classList.add("finished");
                let ods = row.getElementsByClassName("choice");
                Array.from(ods).forEach(el => el.classList.add("finished"));
                Ticket.matchFinished(row.id);
            })
    }
}