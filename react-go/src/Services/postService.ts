import { POSTS, REQUESTURL, USERS, NEWS } from "../constants/urls";
import { Post } from "../models/post";
import { News } from "../models/news";
import { async } from "q";
import { Comment } from "../models/comment";

export async function fetchPosts() {
    try {
        const respone = await fetch(POSTS);
        return await respone.json();
    }
    catch (error) {
        return console.log(error.json());
    }
}

export async function fetchPost(postId:number){
    const res = await fetch(`${POSTS}/${postId}`);
    return await res.json();
}

export function fetchRequest() {
    return fetch(REQUESTURL)
        .then(respone => respone.json())
        .catch(error => console.log(error));
}

export async function updatePost_PUT(incrementer: number, postId: number) {

    const res = await fetch(`${POSTS}/${postId}`);
    const res_1 = await res.json();
    res_1.numOfFavorites += incrementer;
    const res_2 = await fetch(`${POSTS}/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(res_1)
    });
    return await res_2.json();
}

export function addPost_POST(post: Post){

    return fetch(POSTS, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json())
}

export function addNews(news: News){
    return fetch(NEWS, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(news)
    })
}

export async function fetchNews(){
    try {
        const respone = await fetch(NEWS);
        return await respone.json();
    }
    catch (error) {
        return console.log(error.json());
    }
}

export async function deletePost(postId:number){
    const res = await fetch(`${POSTS}/${postId}`, {
        method: "DELETE"
    });
    return await res.json();
}

export function addCommentToPost(postId:number , comment: Comment){
    return fetch(`${POSTS}/${postId}`)
    .then(res => res.json())
    .then(res => {
        res.comments = [...res.comments, comment];
        return fetch(`${POSTS}/${postId}`, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(res)
        })
    })
}