import UserService from "../services/usersService";
import { fromEvent, from } from "rxjs";
import { map, scan, switchMap } from "rxjs/operators";


export default class Ticket{

    static drawTicket(){

        let ticketMainDiv = document.createElement("div");
        ticketMainDiv.className = "ticketMainDiv";

        let tittle = document.createElement("div");
        tittle.innerHTML = "Selected matches";
        tittle.className = "ticketTitle";
        ticketMainDiv.appendChild(tittle);

        let selectedMatches = document.createElement("div");
        selectedMatches.id = "selectedMatches";
        selectedMatches.className = "selectedMatches";

        ticketMainDiv.appendChild(selectedMatches);

        let stake = document.createElement("input");
        stake.value = 0;
        stake.type = "number";
        stake.id = "stake";
        stake.className = "stake";
        fromEvent(stake, "keyup").pipe(
            map(ev => ev.target.value),
        ).subscribe(val => {
            document.getElementById("totalWin").innerHTML = (val * document.getElementById("totalOdd").innerHTML).toFixed(2);
        })
        
        ticketMainDiv.appendChild(stake);

        let cont = document.createElement("div");
        cont.innerHTML = "Total odd: ";
        let totalOdd = document.createElement("label");
        totalOdd.innerHTML = 0;
        totalOdd.id = "totalOdd";
        cont.appendChild(totalOdd);
        ticketMainDiv.appendChild(cont);

        cont = document.createElement("div");
        cont.innerHTML = "Total win: ";
        let winCount = document.createElement("label");
        winCount.innerHTML = 0;
        winCount.id = "totalWin";
        cont.appendChild(winCount);
        ticketMainDiv.appendChild(cont);       

        let placeBet = document.createElement("button");
        placeBet.id = "placeBet";
        placeBet.className = "placeBet";
        placeBet.innerHTML = "Place bet";
        ticketMainDiv.appendChild(placeBet);

        return ticketMainDiv;

    }

    static addMatch(matchId, odd){
        
        let alreadyAdded = document.getElementsByClassName("match");
       
        if ( !Array.from(alreadyAdded).includes(document.getElementById(matchId))){
            UserService.getMatches(`matches/${matchId}`).then(match=> {
                let matchCointainer = document.createElement("div");
                matchCointainer.className = "match";
                matchCointainer.innerHTML =  matchId + " " + match.homeTeam + " vs " +  match.awayTeam;
                matchCointainer.id = match.id;

                let chosenOddValue = document.createElement("div");
                chosenOddValue.innerHTML = odd;
                chosenOddValue.id = "chosenOdd"
                chosenOddValue.className = "chosenOdd";
                matchCointainer.appendChild(chosenOddValue);

                let removeMatch = document.createElement("div");
                removeMatch.className = "removeMatch";
                removeMatch.innerHTML = "X";
                removeMatch.onclick = (ev) => {
                    document.getElementById("selectedMatches").removeChild(document.getElementById(matchId));
                    if (document.getElementsByClassName("match").length == 0){
                        document.getElementById("totalOdd").innerHTML = 0;
                        document.getElementById("totalWin").innerHTML = 0;
                    }
                    else
                        this.oddObs().subscribe(val => {
                            document.getElementById("totalOdd").innerHTML = val;
                        });
                    this.updateWin();
                    
                }
                matchCointainer.appendChild(removeMatch);
                
                document.getElementById("selectedMatches").appendChild(matchCointainer);

                this.oddObs().subscribe(val => {
                    document.getElementById("totalOdd").innerHTML = val;
                });

                this.updateWin();

            })
        }
        else{
            let previousOdd = document.getElementById(matchId).getElementsByTagName("div")[0];

            if (previousOdd.innerHTML != odd)
                previousOdd.innerHTML = odd;

            this.oddObs().subscribe(val => {
                document.getElementById("totalOdd").innerHTML = val;
            });
            
            this.updateWin();
        }

    }

    static oddObs(){
        return from(document.getElementsByClassName("match")).pipe(
            map(match => {
                return match.getElementsByTagName("div")[0].innerHTML;
            }),
            scan((acc, value)=> (acc * value).toFixed(2))
        )
    }

    static updateWin(){

        this.oddObs().subscribe( val => {
             document.getElementById("totalWin").innerHTML = (val * document.getElementById("stake").value).toFixed(2);
        })
    }

    static oddChange(matchId, odd, oldOdd){
        let alreadyAdded = document.getElementsByClassName("match");

        let previous = Array.from(alreadyAdded).filter (el => el.id == matchId);
        if (previous.length > 0)
        
        if (Array.from(alreadyAdded).includes(document.getElementById(matchId))
            && previous.length > 0 && previous[0].getElementsByTagName("div")[0].innerHTML == oldOdd)
            this.addMatch(matchId, odd);

    }
}