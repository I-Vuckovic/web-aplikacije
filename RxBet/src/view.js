

export default class View{
    constructor(){
        this.mainDiv = document.getElementById("app");
        let test = document.createElement("h1");
        test.innerHTML = "test";
        test.className = "test";
        this.mainDiv.appendChild(test);
    }
}