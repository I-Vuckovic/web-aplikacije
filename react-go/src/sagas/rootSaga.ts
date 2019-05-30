import { all, takeEvery, take, fork, put } from 'redux-saga/effects';
import { LOGIN_REQUEST, GET_POSTS, CHECK_LOGIN_STATUS } from '../constants/action-types';
import { fetchUser, getUser } from '../Services/userService';
import { loginApproved, loginDenied } from '../Actions/userActions';
import { fetchPosts } from '../Services/postService';
import { displayPosts, update } from '../Actions/postActions';


export function* loginFlow() {

    while (true) {
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
}

export function* getPosts() {

    yield take(GET_POSTS);

    const posts = yield fetchPosts();

    yield put(displayPosts(posts));
}

export function* pageRefresh(){

    yield take(CHECK_LOGIN_STATUS);

    if (localStorage.getItem("id") !== null){
        let id = parseInt(localStorage.getItem("id")!);
        const user = yield getUser(id);
        yield put(update(user[0].favoritePosts));
    }
}

export function* rootSaga() {
    yield fork(loginFlow);
    yield fork(getPosts);
    yield fork(pageRefresh);
}