
export default class UserService{

    static checkLoginInfo(user) {

        return fetch(`http://localhost:3000/users?username=${user.username}&password=${user.password}`)
        .then(res => res.json())
        .then(res => {
            if (res.length == 0){
                alert("Lose uneti podaci");
                return Promise.reject();
            }
            else{
                //alert("uspeno prijavljen");
                return res;
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
                    return true;
                }
                else{
                    const newUser = {
                        username: user.username,
                        password: user.password,
                        balance: 100
                    }
                    fetch ('http://localhost:3000/users', {
                        method: "POST",
                        body: JSON.stringify(newUser),
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

    static checkUserNameExist(username){
        
        return fetch(`http://localhost:3000/users?username=${username}`)
        .then(res=> res.json())
        .then(res => {
            if (res.length == 0){
                return false;
            }
            else {
                return true;
            }
        })
    }

    static getMatches(category){

        return fetch(`http://localhost:3000/${category}`)
        .then(res => res.json())
        .then(res =>{
            return res;
        })
        .catch(err => console.log(err))
    }

    static balanceChange(newBalance, id){

        fetch (`http://localhost:3000/users/${id}`)
        .then(res => res.json())
        .then(res => {
            res.balance = newBalance;
            fetch (`http://localhost:3000/users/${id}`, {
                method: "PUT",
                body: JSON.stringify(res),
                headers: {
                    'Content-Type': 'application/json'
                } 
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
    
}
