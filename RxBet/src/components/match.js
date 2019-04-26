import {timer, interval, fromEvent, from, of, Observable } from "rxjs";
import { map, takeUntil, take, debounce, debounceTime, filter } from "rxjs/operators";
import Ticket from "./ticket";


export default class Match {

    static drawTableRow(match) {
        let row = document.createElement("tr");
        row.className = "matchRow";
        row.id = match.id;
        let column = document.createElement("td");
        column.innerHTML = match.id + ". " +  match.homeTeam + " vs " + match.awayTeam;
        row.appendChild(column);

        column = document.createElement("td");
        column.style.width = "100px";
        row.appendChild(column);

        let currentTime = match.time;

        if (match.category == "football"){
            this.football(currentTime, column, row);
        }
        if (match.category == "basketball"){
            this.basketball(currentTime, column, row);
        }
        
        let scoreHome = document.createElement("td");
        scoreHome.innerHTML = 0;
        scoreHome.style.width = "65px";
        scoreHome.className = "score";
        let scoreAway = document.createElement("td");
        scoreAway.style.width = "65px";
        scoreAway.innerHTML = 0;
        scoreAway.className = "score";

        row.appendChild(scoreAway);
        row.appendChild(scoreHome);
 
        row.appendChild(this.drawOdd(match.homeTeamOdd, match.id));
        row.appendChild(this.drawOdd(match.drawOdd, match.id));
        row.appendChild(this.drawOdd(match.awayTeamOdd, match.id));

        return row;

    }

    static football(currentTime, column, row) {
        
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
    }

    static basketball(currentTime, column, row){

            if (currentTime < 601) {
                this.basketballTimer(601, currentTime).subscribe( time => {
                    let minutes = parseInt(time / 60);

                    column.innerHTML = "1st " + minutes.toString() + " : " + (time%60).toString();
                },
                err => console.log(err),
                () => {
                    column.innerHTML = "Quater break";
                    this.quaterBreak(601, column, row, 300);
                })
            }

            else if (currentTime < 1201) {
                if (row.classList.contains("quaterbreak")){
                    row.classList.remove("quaterbreak");
                }
                this.basketballTimer(1201, currentTime).subscribe( time => {
                    
                    let minutes = parseInt(time / 60);

                    column.innerHTML = "2nd " + minutes.toString() + " : " + (time%60).toString();
                },
                err => console.log(err),
                () => {
                    column.innerHTML = "Half time";
                    this.quaterBreak(1201, column, row, 900);
                })
            }

            else if (currentTime < 1801) {
                if (row.classList.contains("quaterbreak")){
                    row.classList.remove("quaterbreak");
                }
                this.basketballTimer(1801 ,currentTime).subscribe( time => {
                    let minutes = parseInt(time / 60);

                    column.innerHTML = "3rd " + minutes.toString() + " : " + (time%60).toString();
                },
                err => console.log(err),
                () => {
                    column.innerHTML = "Quater break";
                    this.quaterBreak(1801, column, row, 300);
                })
            }

            else if (currentTime < 2401){
                if (row.classList.contains("quaterbreak")){
                    row.classList.remove("quaterbreak");
                }
                this.basketballTimer(2401,currentTime).subscribe( time => {
                    let minutes = parseInt(time / 60);

                    column.innerHTML = "4th " + minutes.toString() + " : " + (time%60).toString();
                },
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

    static quaterBreak(nextTime, column, row, breakTime){
        timer(1000, 1000).pipe(
            take(breakTime)
        ).subscribe(
            () => { row.classList.add("quaterbreak")},
            err => console.log(err),
            () => this.basketball(nextTime, column, row)
        )
    }

    static basketballTimer(baseTime, currentTime){
        return timer(1000, 1000).pipe(
            take(baseTime - currentTime),
            map(value => baseTime - value - 1 - currentTime)
        )
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

        let headers = ["Time", "Home", "Away", "1", "X", "2"];
        headers.forEach( el =>{
            let tableTitle = document.createElement("th");
            tableTitle.innerHTML = el;
            tableHeader.appendChild(tableTitle);
        })

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
        row.classList.remove("halftime");
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