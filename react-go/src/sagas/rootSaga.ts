import {all, takeEvery, take, fork, put } from 'redux-saga/effects';
import { LOGIN_REQUEST } from '../constants/action-types';
import { fetchUser } from '../Services/userService';
import { loginApproved, loginDenied } from '../Actions/userActions';

export function* loginFlow(){

    while(true){
        const request = yield take(LOGIN_REQUEST);
        const {user} = request;
        const result = yield fetchUser(user);
        if (result.length == 0){
            yield put(loginDenied());
        }
        else{
            yield put(loginApproved(result[0]));
        }
    }
}

export function* rootSaga(){
    yield fork(loginFlow);
}