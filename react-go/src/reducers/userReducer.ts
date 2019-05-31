import { Action } from "redux";
import { User } from "../models/user";
import { LOGIN_REQUEST, LOGIN_APPROVED, LOGIN_DENIED, LOGOUT, CHECK_LOGIN_STATUS, UPDATE, FAILED_REQUEST } from "../constants/action-types";
import { loginRequest, loginApproved } from "../Actions/userActions";
import { update } from "../Actions/postActions";

export interface userState {
    logedIn: boolean;
    username: string;
    failedRequest: boolean;
    favoritePosts: number[];
}

const initialState: userState = {
    logedIn: false,
    username: "",
    failedRequest: false,
    favoritePosts: []
}


export function userReducer(state: userState = initialState, action: Action) {
    switch (action.type) {
        case CHECK_LOGIN_STATUS: {
            if (localStorage.getItem("id") !== null){
                return{
                    ...state,
                    logedIn: true,
                    id: localStorage.getItem("id")!,
                    username: localStorage.getItem("username")!,
                }
            }
            console.log(state);
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
                loginDenied: false,
                favoritePosts: []
            }
        }
        case UPDATE:{
            const {favoritePosts} = action as update;
            return{
                ...state,
                favoritePosts
            }
        }
        case FAILED_REQUEST:{
            localStorage.clear();
            return{
                ...state,
                logedIn: false,
                username: "",
                loginDenied: false,
                failedRequest: true,
                favoritePosts: []
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
