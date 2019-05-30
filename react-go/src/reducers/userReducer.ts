import { Action } from "redux";
import { User } from "../models/user";
import { LOGIN_REQUEST, LOGIN_APPROVED, LOGIN_DENIED, LOGOUT, CHECK_LOGIN_STATUS } from "../constants/action-types";
import { loginRequest, loginApproved } from "../Actions/userActions";

export interface userState {
    logedIn: boolean;
    username: string
}

const initialState: userState = {
    logedIn: false,
    username: ""
}


export function userReducer(state: userState = initialState, action: Action) {
    switch (action.type) {
        case CHECK_LOGIN_STATUS: {
            if (localStorage.getItem("id") !== null){
                return{
                    ...state,
                    logedIn: true,
                }
            }
            return{
                ...state
            }
        }
        case LOGIN_APPROVED: {
            const {user} = action as loginApproved;
            localStorage.setItem("username", user.username);
            localStorage.setItem('id', user.id.toString());
            localStorage.setItem("favoritePosts", JSON.stringify(user.favoritePosts));
            return{
                ...state,
                logedIn: true,
                username: user.username,
                favoritePosts: user.favoritePosts,
                loginDenied: false
            }
        }
        case LOGIN_DENIED: {
            return{
                ...state,
                logedIn: false,
                loginDenied: true,
            }
        }
        case LOGOUT: {
            localStorage.clear();
            return {
                ...state,
                logedIn: false,
                username: "",
                loginDenied: false
            }
        }
        default: {
            return {
                ...state,
                loginDenied: false
            }
        }
    }
}