import { Post } from "../models/post";
import { Action } from "redux";
import { DISPLAY_POSTS,  FAILED_REQUEST, UPDATE_POST, DISPLAY_INDIVIDUAL_POST, DISPLAY_NEWS } from "../constants/action-types";
import { displayPosts, updatePost, displayIndividualPost, displayNews,  } from "../Actions/postActions";
import { News } from "../models/news";

interface postsState {
    posts: Post[]
    news: News[]
}

const initialState : postsState = {
    posts: [],
    news: []
}

export function postReducer(state : postsState = initialState, action : Action){
    switch(action.type){
        case DISPLAY_POSTS:{
            const {posts} = action as displayPosts;
            return{
                ...state,
                posts: posts.map(item => item).reverse()
            }
        }
        case DISPLAY_NEWS: {
            const {news} = action as displayNews;
            return{
                ...state,
                news: news.map(item=>item).reverse()
            }
        }
        case FAILED_REQUEST: {
            return{
                ...state,
                posts: []
            }
        }
        case UPDATE_POST: {
            const {post} = action as updatePost;
            const index = state.posts.findIndex(obj => obj.id === post.id);
            let posts = state.posts;
            posts.splice(index, 1, post);
            return {
                ...state,
                posts,
            }
        }
        case DISPLAY_INDIVIDUAL_POST: {
            const {post} = action as displayIndividualPost;
            return{
                ...state,
                post
            }
        }
        default:{
            return state
        }
    }
}