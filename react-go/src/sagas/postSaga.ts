import { displayPosts, displayIndividualPost, displayNews, addedNewComment, addedNewPost, deletedPost  } from '../Actions/postActions';
import { take, fork, put } from 'redux-saga/effects';
import { fetchPosts, deletePost, fetchPost, addPost_POST, addNews, fetchNews, addCommentToPost } from '../Services/postService';
import { REQUEST_POST, ADD_POST, DELETE_POST, ADD_COMMENT } from '../constants/action-types';
import { News } from '../models/news';

export function* getPosts() {

    const posts = yield fetchPosts();
    const news = yield fetchNews();

    yield put(displayPosts(posts));
    yield put(displayNews(news));
}

export function* getIndividualPost(){

    while(true){
        const request = yield take (REQUEST_POST);
        const {postId} = request;
        const post = yield fetchPost(postId);
        yield put(displayIndividualPost(post));
    }
}

export function* addNewPost(){

    while(true){
        const request = yield take(ADD_POST);
        const {post} = request;
        const news : News = {
            time: post.dateCreated,
            author: post.author,
            body: ` published a new post "${post.title}"`
        }
        const newPost = yield addPost_POST(post);
        
        yield addNews(news);
        yield put(addedNewPost(newPost, news));

    }
}

export function* deleteSelectedPost(){

    while(true){
        const request = yield take(DELETE_POST);
        const {postId} = request;
        const post  =  yield fetchPost(postId);
        yield deletePost(postId);
        const news : News = {
            time: post.dateCreated,
            author: post.author,
            body: ` deleted the post  "${post.title}"`
        }
        yield addNews(news);
        yield put(deletedPost(postId, news));
      
    }
}

export function* addComment(){

    while(true){
        const request = yield take(ADD_COMMENT);
        const {postId, comment} = request;
        yield addCommentToPost(postId, comment);
        yield put(addedNewComment(postId, comment));
    }
}