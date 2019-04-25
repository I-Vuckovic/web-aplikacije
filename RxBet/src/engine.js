import { interval } from "rxjs";
import Ticket from "./components/ticket";


export class Engine{

    constructor(){
        
        interval(5000).subscribe( () => {
            let randomNum = Math.random() *100;
            let matches = document.getElementsByClassName("matchRow");
            let specificMatch = parseInt(Math.random() * matches.length);
            let specificOdd = parseInt(Math.random() * 3);
            let oldValue = parseFloat(matches[specificMatch].getElementsByClassName("choice")[specificOdd].innerHTML);
            let newValue = oldValue;
            if (randomNum < 10){
                if (oldValue > 1.1)
                    newValue = oldValue - (Math.random() * 10) /10;
            }
            else if (randomNum > 90){
                newValue = oldValue + (Math.random() * 10) /10;
            }

            matches[specificMatch].getElementsByClassName("choice")[specificOdd].innerHTML = newValue.toFixed(2);

            Ticket.oddChange(specificMatch +1, newValue.toFixed(2), oldValue);
        })
    }

}