import UserService from "../services/usersService";


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

        return ticketMainDiv;

    }

    static addMatch(matchId, odd){
        
        let alreadyAdded = document.getElementsByClassName("match");
       
        if ( !Array.from(alreadyAdded).includes(document.getElementById(matchId))){
            UserService.getMatches(`matches/${matchId}`).then(match=> {
                let matchCointainer = document.createElement("div");
                matchCointainer.className = "match";
                matchCointainer.innerHTML = match.homeTeam + " vs " +  match.awayTeam;
                matchCointainer.id = match.id;
                let chosenOddValue = document.createElement("div");
                chosenOddValue.innerHTML = odd;
                chosenOddValue.id = "chosenOdd"
                chosenOddValue.className = "chosenOdd";
                matchCointainer.appendChild(chosenOddValue);
                
                document.getElementById("selectedMatches").appendChild(matchCointainer);

            })
        }
        else{
            
        }
    }
}