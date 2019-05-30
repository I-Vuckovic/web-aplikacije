import { Action } from "redux";
import { GET_POSTS, DISPLAY_POSTS,  UPDATE } from "../constants/action-types";
import { Post } from "../models/post";


export interface getPosts extends Action{

}

export interface displayPosts extends Action{
    posts: Post[];
}

export interface update extends Action{
    favoritePosts: number[];
}

export function getPosts() : getPosts{
    return{
        type: GET_POSTS
    }
}

export function displayPosts(posts: Post[]) : displayPosts {
    return{
        type: DISPLAY_POSTS,
        posts
    }
}

export function update(favoritePosts: number[]): update{
    return{
        type: UPDATE,
        favoritePosts
    }
}

