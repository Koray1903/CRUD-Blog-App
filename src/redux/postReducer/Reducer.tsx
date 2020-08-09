import {PostActionTypes} from "./Actions";

interface InitialState {
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
    comments: []
  }
}

const initialState: InitialState = {
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

export interface actionType {
  action: Action;
  type: any;
  payload: any
}

type Action =
  | { type: PostActionTypes.FETCH_ALL_POSTS; payload: [] }
  | { type: PostActionTypes.FETCH_SINGLE_POST; payload: {} }
  | { type: PostActionTypes.FETCH_COMMENTS; payload: [] }
  | { type: PostActionTypes.CREATE_POST }
  | { type: PostActionTypes.DELETE_POST }
  | { type: PostActionTypes.UPDATE_POST }
  | { type: PostActionTypes.CREATE_COMMENT; payload: {} };

export const postReducer = (state = initialState, action: actionType) => {
  switch (action.type) {

    case PostActionTypes.FETCH_ALL_POSTS:
      return {
        ...state,
        posts: [...action.payload]
      };

    case PostActionTypes.FETCH_SINGLE_POST:

      return {
        ...state,
        post: action.payload
      };

    case PostActionTypes.FETCH_COMMENTS:

      return {
        ...state,
        post: {
          ...state.post,
          comments: [...action.payload]
        }
      };

    case PostActionTypes.CREATE_POST:
      return {
        ...state,
      };

    case PostActionTypes.DELETE_POST:
      return {
        ...state,

      };

    case PostActionTypes.UPDATE_POST:
      return {
        ...state,
      };

    case PostActionTypes.CREATE_COMMENT:
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