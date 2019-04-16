
export default class UserService{
    constructor(){

    }

    static checkLoginInfo(user) {

        return fetch(`http://localhost:3000/users?username=${user.username}&password=${user.password}`)
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

    static registerNewUser(user){

        if (!user.username || !user.password){
            alert("Niste uneli Username ili password");
            return Promise.reject();
        }
        else{
            return fetch (`http://localhost:3000/users?username=${user.username}`)
            .then (res => res.json())
            .then (res => {
                if (res.length != 0){
                    alert("Username vec postoji, izaberite drugi");
                    Promise.reject();
                }
                else{
                    fetch ('http://localhost:3000/users', {
                        method: "POST",
                        body: JSON.stringify(user),
                        headers: {
                           'Content-Type': 'application/json'
                        } 
                    })
                    .then(() => alert('Uspesna registracija'))
                    .catch(err => console.log(err))
                }
            })
        }
    }
}
