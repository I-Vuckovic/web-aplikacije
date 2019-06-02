
//USER ACTIONS
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_APPROVED = "LOGIN_APPROVED";
export const LOGIN_DENIED = "LOGIN_DENIED";
export const LOGOUT = "LOGOUT";
export const CHECK_LOGIN_STATUS = "CHECK_LOGIN_STATUS";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const UPDATE_FAVORITES = "UPDATE_FAVORITES";

//POST ACTIONS
export const GET_POSTS = "GET_POSTS";
export const DISPLAY_POSTS = "DISPLAY_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const REQUEST_POST = "REQUEST_POST";
export const DISPLAY_INDIVIDUAL_POST = "DISPLAY_INDIVIDUAL_POST";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
//NEWS ACTION - implenetations are within "post actions"
export const GET_NEWS = "GET_NEWS"; // This action may not be needed at all
export const DISPLAY_NEWS = "DISPLAY_NEWS";

//GLOBAL ACTIONS
export const FAILED_REQUEST = "FAILED_REQUEST";
export const REQUEST = "REQUEST";

//COMMENT ACTIONS - implementations are within "post actions"
export const ADD_COMMENT = "ADD_COMMENT";
export const ADDED_NEW_COMMENT = "ADDED_NEW_COMMENT";