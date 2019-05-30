import { POSTS } from "../constants/urls";

export function fetchPosts(){
    return fetch(POSTS)
    .then(respone => respone.json());
}