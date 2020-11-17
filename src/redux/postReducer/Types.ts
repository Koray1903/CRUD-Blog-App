import {Action} from "redux";
import {ThunkAction} from 'redux-thunk'
import {RootState} from "../rootReducer"

export enum ActionTypes {
    FETCH_ALL_POSTS = "FETCH_ALL_POSTS",
    FETCH_SINGLE_POST = "FETCH_SINGLE_POST",
    FETCH_COMMENTS = "FETCH_COMMENTS",
    CREATE_POST = "CREATE_POST",
    DELETE_POST = "DELETE_POST",
    UPDATE_POST = "UPDATE_POST",
    CREATE_COMMENT = "CREATE_COMMENT",
}

export interface ReducerState {
    posts: [
        {
            id: number,
            title: string,
            body: string
        }
    ],
    post: {
        id: number,
        title: string,
        body: string,
        comments: any[]
    }
}

export interface ReducerAction {
    type: string;
    payload?: any
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export type DispatchType = (args: ReducerAction) => ReducerAction

interface fetchedPostsAction {
    type: string,
    payload?: any
}

interface fetchSinglePostAction {
    type: string,
    payload?: any
}

interface fetchedSinglePostAction {
    type: string,
    payload?: any
}

interface fetchCommentsAction {
    type: string,
    payload?: any
}

interface fetchedCommentsAction {
    type: string,
    payload?: any
}

interface createCommentAction {
    type: string,
    payload?: any
}

interface createdCommentsAction {
    type: string,
    payload?: any
}

interface createPostAction {
    type: string,
    payload?: any
}

interface deletePostAction {
    type: string,
    payload?: any
}

interface updatePostAction {
    type: string,
    payload?: any
}

export type ActionTypes1 =
    fetchedPostsAction |
    fetchSinglePostAction |
    fetchedSinglePostAction |
    fetchCommentsAction |
    fetchedCommentsAction |
    createCommentAction |
    createdCommentsAction |
    createPostAction |
    deletePostAction |
    updatePostAction
