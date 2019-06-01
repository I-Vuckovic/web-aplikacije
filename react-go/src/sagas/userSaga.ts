import { all, takeEvery, take, fork, put } from 'redux-saga/effects';
import {makeRequest} from "./rootSaga";
import { LOGIN_REQUEST, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../constants/action-types";
import { loginDenied , loginApproved, updateFavorites  } from '../Actions/userActions';
import { failedRequest } from '../Actions/gloablActions';
import { fetchUser, addToFavorites, removeFromFavorites } from '../Services/userService';
import { updatePost } from '../Actions/postActions';
import { updatePost_PUT } from '../Services/postService';



export function* loginFlow() {

    while (true) {
        const status = yield makeRequest();
        if (status == 1) {
            const request = yield take(LOGIN_REQUEST);
            const { user } = request;
            const result = yield fetchUser(user);
            if (result.length == 0) {
                yield put(loginDenied());
            }
            else {
                yield put(loginApproved(result[0]));

            }
        }
        else{
            yield put(failedRequest());
        }
    }
}


export function* addPostToFavorites(){

    while(true){
        const request = yield take(ADD_TO_FAVORITES);
        const {postId, userId} = request;
        const user = yield addToFavorites(postId, userId);
        const post = yield updatePost_PUT(1,postId);
    
        yield put(updatePost(post));
        yield put(updateFavorites(user.favoritePosts));

    }
}

export function* removePostFromFavorites(){

    while(true){
        const request = yield take(REMOVE_FROM_FAVORITES);
        const {postId, userId} = request;
        const user = yield removeFromFavorites(postId, userId);
        const post = yield updatePost_PUT(-1,postId);
      
        yield put(updatePost(post));
        yield put(updateFavorites(user.favoritePosts));
    }
}