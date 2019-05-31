import { all, takeEvery, take, fork, put } from 'redux-saga/effects';
import { LOGIN_REQUEST, GET_POSTS, CHECK_LOGIN_STATUS, REQUEST } from '../constants/action-types';
import { fetchUser, getUser } from '../Services/userService';
import { loginApproved, loginDenied, checkLoginStatus } from '../Actions/userActions';
import { fetchPosts, fetchRequest } from '../Services/postService';
import { displayPosts, update } from '../Actions/postActions';
import { failedRequest } from '../Actions/gloablActions';


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

export function* getPosts() {

    const posts = yield fetchPosts();

    yield put(displayPosts(posts));
}

export function* pageRefresh() {

    yield put(checkLoginStatus());
    if (localStorage.getItem("id") !== null) {
        
        let id = parseInt(localStorage.getItem("id")!);
        const user = yield getUser(id);
        if (user === undefined) {
            yield put(failedRequest());
        }
        else {
            
            yield put(update(user[0].favoritePosts));
        }
    }
}

function* makeRequest() {
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
    }
    else {
        yield put(failedRequest());
    }
}