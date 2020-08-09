import {BASE_URL} from "../../endpoints";
import axios from "axios";

export enum PostActionTypes {
  FETCH_ALL_POSTS = "FETCH_ALL_POSTS",
  FETCH_SINGLE_POST = "FETCH_SINGLE_POST",
  FETCH_COMMENTS = "FETCH_COMMENTS",
  CREATE_POST = "CREATE_POST",
  DELETE_POST = "DELETE_POST",
  UPDATE_POST = "UPDATE_POST",
  CREATE_COMMENT = "CREATE_COMMENT",
}

export const fetchAllPosts = () => {
  return (dispatch: any) => {
    axios.get(`${BASE_URL}/posts`)
      .then(res => dispatch(fetchedPosts(res.data)));
  };
};

export const fetchedPosts = (data: []) => {
  return {
    type: PostActionTypes.FETCH_ALL_POSTS,
    payload: data
  };
};

export const fetchSinglePost = (id: number) => {
  return (dispatch: any) => {
    axios.get(`${BASE_URL}/posts/${id}?_embed=comments`)
      .then(res => {
        dispatch(fetchedSinglePost(res.data));
      });
  };
};

export const fetchedSinglePost = (data: {}) => {
  return {
    type: PostActionTypes.FETCH_SINGLE_POST,
    payload: data
  };
};

export const fetchComments = (id: number) => {
  return (dispatch: any) => {
    axios.get(`${BASE_URL}/posts/${id}?_embed=comments`)
      .then(res => {
        dispatch(fetchedComments(res.data.comments));
      });
  };
};

export const fetchedComments = (data: []) => {
  return {
    type: PostActionTypes.FETCH_COMMENTS,
    payload: data
  };
};

export const createComment = (id: number, comment: string) => {
  axios.post(`${BASE_URL}/comments`,
    {
      postId: id,
      body: comment
    })

  return (dispatch: any) => {
    axios.get(`${BASE_URL}/posts/${id}?_embed=comments`)
      .then(res => {
        dispatch(createdComments(res.data.comments));
      });
  };
};

export const createdComments = (data: []) => {
  return {
    type: PostActionTypes.CREATE_COMMENT,
    payload: data
  };
};

export const createPost = (title: string, body: string) => {
  axios.post(`${BASE_URL}/posts`,
    {
      title: title,
      body: body
    })

  return {
    type: PostActionTypes.CREATE_POST
  };
};

export const deletePost = (id: number) => {
  axios.delete(`${BASE_URL}/posts/${id}`)

  return {
    type: PostActionTypes.DELETE_POST
  };
};

export const updatePost = (id: number, title: string, body: string) => {
  axios.put(`${BASE_URL}/posts/${id}`,
    {
      title: title,
      body: body
    })

  return {
    type: PostActionTypes.UPDATE_POST,
  };
};
