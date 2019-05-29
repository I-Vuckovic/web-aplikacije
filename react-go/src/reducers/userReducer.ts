import { Action } from "redux";
import { User } from "../models/user";
import { LOGIN_REQUEST, LOGIN_APPROVED, LOGIN_DENIED } from "../constants/action-types";
import { loginRequest, loginApproved } from "../Actions/userActions";
import { fetchUser } from "../Services/userService";


export interface userState {
    logedIn: boolean;
    user: User
}

const initialState: userState = {
    logedIn: false,
    user: {
        username: "",
        password: ""
    }
}


export function userReducer(state: userState = initialState, action: Action) {
    switch (action.type) {
        case LOGIN_APPROVED: {
            const {user} = action as loginApproved;
            return{
                ...state,
                logedIn: true,
                user: user
            }
        }
        case LOGIN_DENIED: {
            return{
                ...state,
                logedIn: false,
            }
        }
        default:
            return state;
    }
}