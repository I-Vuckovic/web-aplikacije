import { User } from "../models/user";

const url = "http://localhost:3001/users";

export function fetchUser(user: User) {
    return fetch(`${url}?username=${user.username}&password=${user.password}`)
        .then(res => res.json())
        
}
