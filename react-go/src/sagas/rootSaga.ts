import { take, fork, put } from 'redux-saga/effects';
import { REQUEST, REQUEST_POST } from '../constants/action-types';
import {  getUser } from '../Services/userService';
import { checkLoginStatus, updateFavorites } from '../Actions/userActions';
import { fetchPosts, fetchRequest, fetchPost } from '../Services/postService';
import { failedRequest } from '../Actions/gloablActions';
import {loginFlow, addPostToFavorites, removePostFromFavorites} from './userSaga';
import { getPosts, getIndividualPost, addNewPost, deleteSelectedPost } from './postSaga';

export function* pageRefresh() {

    yield put(checkLoginStatus());
    if (localStorage.getItem("id") !== null) {
        
        let id = parseInt(localStorage.getItem("id")!);
        const user = yield getUser(id);
        if (user === undefined) {
            yield put(failedRequest());
        }
        else {
            
            yield put(updateFavorites(user[0].favoritePosts));
        }
    }
}

export function* makeRequest() {
    const request = yield fetchRequest();
    if (request === undefined) {
        return 0;
    }
    else {
        return 1;
    }
    // 0 - failed to connect to server
    // 1 - succesfull connection
}


export function* rootSaga() {
    yield take(REQUEST);
    const status = yield makeRequest();
    if (status == 1) {
        yield fork(loginFlow);
        yield fork(getPosts);
        yield fork(pageRefresh);
        yield fork(addPostToFavorites);
        yield fork(removePostFromFavorites);
        yield fork(getIndividualPost);
        yield fork(addNewPost);
        yield fork(deleteSelectedPost);
    }
    else {
        yield put(failedRequest());
    }
}