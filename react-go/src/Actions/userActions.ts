import { LOGIN_REQUEST, LOGIN_APPROVED, LOGIN_DENIED, LOGOUT, CHECK_LOGIN_STATUS, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, UPDATE_FAVORITES, REGISTER, USERNAME_TAKEN, REGISTER_APPROVED } from "../constants/action-types";
import { User } from "../models/user";
import { Action } from "redux";

// #region Interfaces

export interface loginRequest extends Action {
    user: User,
}

export interface loginApproved extends Action {
    user: User
}

export interface loginDenied extends Action {

}

export interface logout extends Action {

}

export interface checkLoginStatus extends Action {

}

export interface addToFavorites extends Action {
    postId: number;
    userId: number;
}

export interface removeFromFavorites extends Action{
    postId: number;
    userId: number
}

export interface updateFavorites extends Action{
    favoritePosts: number[];
}

export interface register extends Action{
    user: User
}

export interface usernameTaken extends Action{

}

export interface registerApproved extends Action{

}

// #endregion

// #region Action creators

export function loginRequest(user: User): loginRequest {
    return {
        type: LOGIN_REQUEST,
        user
    }
}

export function loginApproved(user: User): loginApproved {
    return {
        type: LOGIN_APPROVED,
        user
    }
}

export function loginDenied(): loginDenied {
    return {
        type: LOGIN_DENIED
    }
}

export function logout(): logout {
    return {
        type: LOGOUT
    }
}

export function checkLoginStatus(): checkLoginStatus {
    return {
        type: CHECK_LOGIN_STATUS
    }
}

export function addToFavorites(postId: number, userId: number): addToFavorites {
    return{
        type: ADD_TO_FAVORITES,
        postId,
        userId
    }
}

export function removeFromFavorites(postId: number, userId: number): removeFromFavorites{
    return{
        type: REMOVE_FROM_FAVORITES,
        postId,
        userId
    }
}

export function updateFavorites(favoritePosts: number[] ) :updateFavorites{
    return{
        type: UPDATE_FAVORITES,
        favoritePosts
    }
}

export function register(user: User): register{
    return{
        type: REGISTER,
        user
    }
}

export function usernameTaken() :usernameTaken{
    return{
        type: USERNAME_TAKEN
    }
}

export function registerApproved(): registerApproved{
    return{
        type: REGISTER_APPROVED
    }
}

// #endregions