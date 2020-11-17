import {BASE_URL} from "../../endpoints";
import {AppThunk} from "./Types";
import {Dispatch} from "redux";
// import {RootState} from "../rootReducer"
import axios from "axios";
import {ActionTypes, ActionTypes1} from "./Types"
import {db} from "../../firebase";


export const fetchAllPosts = (): AppThunk => {
    return (dispatch: Dispatch) => {
        db.collection("postCollection")
            .doc("MNOnNRJx4J6Jy3Bw4LNG")
            .get()
            .then(doc => {
                console.log(doc.data());
                dispatch(fetchedPosts(doc.data()));
            })
            .catch(error => console.log(error.message));
    };
};

// export const fetchAllPosts = (): AppThunk => {
//     return (dispatch: Dispatch) => {
//         axios.get(`${BASE_URL}/posts`)
//             .then(res => dispatch(fetchedPosts(res.data)));
//     };
// };

export const fetchedPosts = (data: any): ActionTypes1 => {
    return {
        type: ActionTypes.FETCH_ALL_POSTS,
        payload: data.posts
    };
};

export const fetchSinglePost = (id: number): AppThunk => {
    return (dispatch: Dispatch) => {
        axios.get(`${BASE_URL}/posts/${id}?_embed=comments`)
            .then(res => {
                dispatch(fetchedSinglePost(res.data));
            });
    };
};

export const fetchedSinglePost = (data: {}): ActionTypes1 => {
    return {
        type: ActionTypes.FETCH_SINGLE_POST,
        payload: data
    };
};

export const fetchComments = (id: number): AppThunk => {
    return (dispatch: Dispatch) => {
        axios.get(`${BASE_URL}/posts/${id}?_embed=comments`)
            .then(res => {
                dispatch(fetchedComments(res.data.comments));
            });
    };
};

export const fetchedComments = (data: []): ActionTypes1 => {
    return {
        type: ActionTypes.FETCH_COMMENTS,
        payload: data
    };
};

export const createComment = (id: number, comment: string) => {
    axios.post(`${BASE_URL}/comments`,
        {
            postId: id,
            body: comment
        })

    return (dispatch: Dispatch) => {
        axios.get(`${BASE_URL}/posts/${id}?_embed=comments`)
            .then(res => {
                dispatch(createdComments(res.data.comments));
            });
    };
};

export const createdComments = (data: []): ActionTypes1 => {
    return {
        type: ActionTypes.CREATE_COMMENT,
        payload: data
    };
};

export const createPost = (title: string, body: string): ActionTypes1 => {
    axios.post(`${BASE_URL}/posts`,
        {
            title: title,
            body: body
        })

    return {
        type: ActionTypes.CREATE_POST
    };
};

export const deletePost = (id: number): ActionTypes1 => {
    axios.delete(`${BASE_URL}/posts/${id}`)

    return {
        type: ActionTypes.DELETE_POST
    };
};

export const updatePost = (id: number, title: string, body: string): ActionTypes1 => {
    axios.put(`${BASE_URL}/posts/${id}`,
        {
            title: title,
            body: body
        })

    return {
        type: ActionTypes.UPDATE_POST,
    };
};
