import { Post } from "../models/post";
import { Action } from "redux";
import { DISPLAY_POSTS,  FAILED_REQUEST, UPDATE_POST, DISPLAY_INDIVIDUAL_POST, DISPLAY_NEWS, REQUEST_POST, ADDED_NEW_COMMENT, ADDED_NEW_POST, DELETED_POST } from "../constants/action-types";
import { displayPosts, updatePost, displayIndividualPost, displayNews, requestPost, addedNewComment, addedNewPost, deletedPost,  } from "../Actions/postActions";
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
            const slicedNews = news.reverse().slice(0,5);
            return{
                ...state,
                news: slicedNews
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
        case REQUEST_POST: {
            const {postId} = action as requestPost;
            return{
                ...state,
                post: state.posts.filter(post => post.id == postId)[0]
            }
        }
        case ADDED_NEW_COMMENT:{
            const {postId, comment} = action as addedNewComment;
            const newPosts = state.posts.map((post: Post)=>{
                if (post.id == postId){
                    post.comments = [...post.comments, comment];
                }
                return post;
            })
            return{
                ...state,
                posts: state.posts,
                post: state.posts.filter((post:Post) => post.id == postId)[0],
            }

        }
        case ADDED_NEW_POST: {
            const {post,news} = action as addedNewPost;
            const newPosts = [ post, ...state.posts];
            const newNews = [ news ,...state.news];
            return{
                ...state,
                posts: newPosts,
                news: newNews
            }
        }
        case DELETED_POST:{
            const {postId, news} = action as deletedPost;
            return{
                ...state,
                posts: state.posts.filter((post:Post) => post.id !== postId),
                news: [news , ...state.news]
            }
        }
        default:{
            return state
        }
    }
}