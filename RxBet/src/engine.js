import { interval, timer, from, zip } from "rxjs";
import Ticket from "./components/ticket";
import { map, filter, repeat } from "rxjs/operators";


export class Engine{

    constructor(){

        const $matches = from(
            Array.from(document.getElementsByClassName("matchRow"))
        )
        const $interval = interval(1000);

        const $observable = zip($interval, $matches).pipe(
            filter( match => !match[1].classList.contains("finished") && !match[1].classList.contains("halftime") 
                                && !match[1].classList.contains("quaterbreak")),
            map( match => match[1]),
            repeat(-1)
        )
        
        $observable.subscribe(match => {
            let randomNum = Math.random() *100;
            let specificOdd = parseInt(Math.random() * 3);
            let oldValue = parseFloat(match.getElementsByClassName("choice")[specificOdd].innerHTML);
            let newValue = oldValue;
            if (randomNum < 10){
                if (oldValue > 1.1){
                    newValue = oldValue - (Math.random() * 10) /10;
                    match.getElementsByClassName("choice")[specificOdd].classList.add("oddLowered");
                    match.getElementsByClassName("choice")[specificOdd].classList.remove("oddRaised");
                }
            }
            else if (randomNum > 90){
                newValue = oldValue + (Math.random() * 10) /10;
                match.getElementsByClassName("choice")[specificOdd].classList.add("oddRaised");
                match.getElementsByClassName("choice")[specificOdd].classList.remove("oddLowered");
            }

            match.getElementsByClassName("choice")[specificOdd].innerHTML = newValue.toFixed(2);
            Ticket.oddChange(match.id, newValue.toFixed(2), oldValue);
        });

        $observable.subscribe(match => {
            let scores = match.getElementsByClassName("score");
            let randomChance = Math.random() * 10;
            if(randomChance<2){
                let currentScore = parseInt(scores[0].innerHTML);
                currentScore += 1;
                scores[0].innerHTML = currentScore;
            }
            else if (randomChance> 8){
                let currentScore = parseInt(scores[1].innerHTML);
                currentScore += 1;
                scores[1].innerHTML = currentScore;
            }
        })
    }

}