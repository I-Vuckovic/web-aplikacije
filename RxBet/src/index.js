
import View from "./view"
import { interval } from "rxjs";
import { Engine } from "./engine";

const view = new View();

function loadBody (){
    return new Promise(resovle => {
        setTimeout(() => {
            let engine = new Engine();
            return engine;
        }, 2000);
    })
}

async function loadEngine(){
    const engine = await loadBody();
}

loadEngine();