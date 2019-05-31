import { Post } from "../models/post";
import { Action } from "redux";
import { DISPLAY_POSTS, UPDATE, FAILED_REQUEST } from "../constants/action-types";
import { displayPosts, update } from "../Actions/postActions";

interface postsState {
    posts: Post[]
}

const initialState : postsState = {
    posts: [],
}

export function postReducer(state : postsState = initialState, action : Action){
    switch(action.type){
        case DISPLAY_POSTS:{
            const {posts} = action as displayPosts;
            //console.log(posts);
            return{
                ...state,
                posts
            }
        }
        case FAILED_REQUEST: {
            return{
                ...state,
                posts: []
            }
        }
        default:{
            return state
        }
    }
}