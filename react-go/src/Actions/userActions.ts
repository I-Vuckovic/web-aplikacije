import { LOGIN_REQUEST, LOGIN_APPROVED, LOGIN_DENIED, LOGOUT, CHECK_LOGIN_STATUS } from "../constants/action-types";
import { User } from "../models/user";
import { Action } from "redux";

export interface loginRequest extends Action{
    user: User,
}

export interface loginApproved extends Action{
    user: User
}

export interface loginDenied extends Action{

}

export interface logout extends Action{

}

export interface checkLoginStatus extends Action{

}

export function loginRequest (user: User): loginRequest{
    return {
        type: LOGIN_REQUEST,
        user
    }
}

export function loginApproved(user: User): loginApproved{
    return{
        type: LOGIN_APPROVED,
        user
    }
}

export function loginDenied() : loginDenied {
    return {
        type: LOGIN_DENIED
    }
}

export function logout() : logout {
    return {
        type: LOGOUT
    }
}

export function checkLoginStatus() : checkLoginStatus{
    return{
        type: CHECK_LOGIN_STATUS
    }
}


