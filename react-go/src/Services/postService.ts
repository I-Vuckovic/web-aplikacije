import { POSTS, REQUESTURL } from "../constants/urls";

export async function fetchPosts(){
    try {
        const respone = await fetch(POSTS);
        return await respone.json();
    }
    catch (error) {
        return console.log(error.json());
    }
}

export function fetchRequest(){
    return fetch(REQUESTURL)
    .then(respone => respone.json())
    .catch(error => console.log(error));
}