
export default class UserService{
    constructor(){

    }

    static checkLoginInfo(data) {

        return fetch(`http://localhost:3000/users?username=${data.username}&password=${data.password}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.length == 0){
                alert("Lose uneti podaci");
                return Promise.reject();
            }
            else{
                //alert("uspeno prijavljen");
                return Promise.resolve();
            }
        })
    }
}
