import {Action} from "redux";
import {ThunkAction} from 'redux-thunk'
import {RootState} from "./rootReducer"


// REDUCER
export interface iComment {
    postID: string,
    body: string,
    created_at: Date
}

export interface iPost {
    postID: string,
    title: string,
    body: string,
    created_at: Date
}

export interface iState {
    posts: iPost[],
    comments: iComment[]
}

export interface iReducerAction {
    type: string;
    payload?: any
}
// REDUCER

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export enum ActionTypes {
    FETCH_ALL_POSTS = "FETCH_ALL_POSTS",
    FETCH_ALL_COMMENTS = "FETCH_ALL_COMMENTS",
    CREATE_POST = "CREATE_POST",
    DELETE_POST = "DELETE_POST",
    UPDATE_POST = "UPDATE_POST",
    CREATE_COMMENT = "CREATE_COMMENT"
}
