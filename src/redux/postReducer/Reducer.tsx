// import {Reducer} from "redux";
import {ActionTypes, ReducerState, ReducerAction} from "./Types"

const initialState: ReducerState = {
    posts: [
        {
            id: 0,
            title: "",
            body: ""
        }
    ],
    post: {
        id: 0,
        title: "",
        body: "",
        comments: []
    }
}

export const postReducer = (state: ReducerState = initialState, action: ReducerAction): ReducerState => {
    switch (action.type) {

        case ActionTypes.FETCH_ALL_POSTS:
            return {
                ...state,
                // posts: [...action.payload]
            };

        case ActionTypes.FETCH_SINGLE_POST:

            return {
                ...state,
                post: action.payload
            };

        case ActionTypes.FETCH_COMMENTS:

            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [...action.payload]
                }
            };

        case ActionTypes.CREATE_POST:
            return {
                ...state,
            };

        case ActionTypes.DELETE_POST:
            return {
                ...state,

            };

        case ActionTypes.UPDATE_POST:
            return {
                ...state,
            };

        case ActionTypes.CREATE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [...action.payload]
                }
            };

        default:
            return state;
    }
};
