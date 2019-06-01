import { Action } from "redux";
import { GET_POSTS, DISPLAY_POSTS, UPDATE_POST, REQUEST_POST, DISPLAY_INDIVIDUAL_POST, ADD_POST, GET_NEWS, DISPLAY_NEWS, DELETE_POST } from "../constants/action-types";
import { Post } from "../models/post";
import { News } from "../models/news";

// #region interfaces

export interface getPosts extends Action{

}

export interface displayPosts extends Action{
    posts: Post[];
}

export interface updatePost extends Action{
    post: Post
}

export interface requestPost extends Action{
    postId: number
}

export interface displayIndividualPost extends Action{
    post: Post
}

export interface addPost extends Action{
    post: Post
}

export interface deletePost extends Action{
    postId: number
}

// #endregion 


// #region Action creaters

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

export function updatePost( post: Post): updatePost{
    return{
        type: UPDATE_POST,
        post
    }
}

export function requestPost(postId: number): requestPost{
    return{
        type: REQUEST_POST,
        postId
    }
}

export function displayIndividualPost(post: Post): displayIndividualPost{
    return{
        type: DISPLAY_INDIVIDUAL_POST,
        post
    }
}

export function addPost(post: Post): addPost{
    return{
        type: ADD_POST,
        post
    }
}

export function deletePost(postId: number): deletePost{
    return{
        type: DELETE_POST,
        postId
    }
}

// #endregion

//NEWS 

export interface getNews extends Action{

}

export function getNews(news: News[]) : getNews {
    return{
        type: GET_NEWS,
    }
}

export interface displayNews extends Action{
    news: News[]
}

export function displayNews(news: News[]): displayNews{
    return{
        type: DISPLAY_NEWS,
        news
    }
}