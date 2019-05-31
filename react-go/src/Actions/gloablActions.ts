import { Action } from "redux";
import { FAILED_REQUEST, REQUEST } from "../constants/action-types";

export interface failedRequest extends Action{

}

export interface request extends Action{

}

export function failedRequest() : failedRequest{
    return {
        type: FAILED_REQUEST
    }
}

export function request() : request{
    return {
        type: REQUEST
    }
}