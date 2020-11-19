import {ActionTypes, iState, iReducerAction} from "./Types"


const initialState = {
    posts: [],
    comments: []
}


export const reducer = (state: iState = initialState, action: iReducerAction): iState => {

    switch (action.type) {

        case ActionTypes.FETCH_ALL_POSTS:

            return {
                ...state,
                posts: [...action.payload]
            };

        case ActionTypes.FETCH_ALL_COMMENTS:

            return {
                ...state,
                comments: [...action.payload]
            };

        case ActionTypes.CREATE_POST:

            return {
                ...state,
            };

        case ActionTypes.DELETE_POST:

            return {
                ...state
            };

        case ActionTypes.UPDATE_POST:

            return {
                ...state
            };

        case ActionTypes.CREATE_COMMENT:

            return {
                ...state
            };

        default:
            return state;
    }
};
