import { User } from "../models/user";
import { USERS } from "../constants/urls";

export async function fetchUser(user: User) {
    const res = await fetch(`${USERS}?username=${user.username}&password=${user.password}`);
    return await res.json();
        
}

export async function getUser(id: number){
    try{
    const res = await fetch(`${USERS}?id=${id}`);
    return await res.json();
    }
    catch (res) {
        console.log(res);
    }
}
