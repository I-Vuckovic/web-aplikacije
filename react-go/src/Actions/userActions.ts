import { LOGIN_REQUEST, LOGIN_APPROVED, LOGIN_DENIED } from "../constants/action-types";
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