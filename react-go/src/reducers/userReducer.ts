import { Action } from "redux";
import { User } from "../models/user";
import { LOGIN_REQUEST, LOGIN_APPROVED, LOGIN_DENIED, LOGOUT, CHECK_LOGIN_STATUS, FAILED_REQUEST, UPDATE_FAVORITES } from "../constants/action-types";
import { loginRequest, loginApproved, updateFavorites } from "../Actions/userActions";

export interface userState {
    userId: number;
    logedIn: boolean;
    username: string;
    failedRequest: boolean;
    favoritePosts: number[];
    moderator: boolean;
}

const initialState: userState = {
    userId: -1,
    logedIn: false,
    username: "",
    failedRequest: false,
    favoritePosts: [],
    moderator: false
}


export function userReducer(state: userState = initialState, action: Action) {
    switch (action.type) {
        case CHECK_LOGIN_STATUS: {
            if (localStorage.getItem("id") !== null){
                const mod = localStorage.getItem("moderator")! === "true" ? true : false;
                return{
                    ...state,
                    logedIn: true,
                    userId: parseInt(localStorage.getItem("id")!),
                    username: localStorage.getItem("username")!,
                    moderator: mod,
                    favoritePosts: JSON.parse(localStorage.getItem("favoritePosts")!)
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
            localStorage.setItem("moderator", user.moderator.toString());
            return{
                ...state,
                logedIn: true,
                username: user.username,
                favoritePosts: user.favoritePosts,
                loginDenied: false,
                userId: user.id,
                moderator: user.moderator
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
                userId: -1,
                logedIn: false,
                username: "",
                loginDenied: false,
                favoritePosts: [],
                moderator: false
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
        case UPDATE_FAVORITES: {
            const { favoritePosts } = action as updateFavorites;
            return{
                ...state,
                favoritePosts
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
