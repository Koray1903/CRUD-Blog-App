import {Dispatch} from "redux";
import {AppThunk, ActionTypes, iPost, iComment} from "./Types"
import {db} from "../firebase";


export const fetchAllPosts = (): AppThunk => {

    return (dispatch: Dispatch) => {
        db.collection("postCollection")
            .get()
            .then(querySnapshot => {
                const documentsArray: iPost[] = [];
                querySnapshot.forEach((doc) => {
                    documentsArray.push({
                        postID: doc.id,
                        title: doc.data().title,
                        body: doc.data().body,
                        created_at: new Date(doc.data().created_at)
                    })
                })
                dispatch(fetchedPosts(documentsArray));
            })
            .catch(error => console.log(error.message));
    };
};


export const fetchedPosts = (data: iPost[]) => {

    return {
        type: ActionTypes.FETCH_ALL_POSTS,
        payload: data
    };
};


export const createNewPost = (title: string, body: string, postID: string) => {

    db.collection("postCollection")
        .doc(postID)
        .set({
            title: title,
            body: body,
            created_at: Date.now(),
            postID: postID
        })
        .catch(error => console.log(error.message));

    return {
        type: ActionTypes.CREATE_POST
    };
};


export const deletePost = (postID: string) => {

    db.collection("postCollection")
        .doc(postID)
        .delete()
        .catch(error => console.log(error.message));

    db.collection("commentCollection")
        .where("postID", "==", postID)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            })
        })
        .catch(error => console.log(error.message));

    return {
        type: ActionTypes.DELETE_POST
    };
};


export const updatePost = (id: string, title: string, body: string) => {

    db.collection("postCollection")
        .doc(id)
        .set({title: title, body: body}, {merge: true})
        .catch(error => console.log(error.message));

    return {
        type: ActionTypes.UPDATE_POST,
    };
};


export const createComment = (postID: string, body: string, commentID: string) => {

    db.collection("commentCollection")
        .doc(commentID)
        .set({
            body: body,
            created_at: Date.now(),
            postID: postID
        })
        .catch(error => console.log(error.message));

    return {
        type: ActionTypes.UPDATE_POST,
    };
};


export const fetchComments = (postID: string): AppThunk => {

    return (dispatch: Dispatch) => {

        db.collection("commentCollection")
            .where("postID", "==", postID)
            .get()
            .then(querySnapshot => {
                const documentsArray: iComment[] = [];
                querySnapshot.forEach((doc) => {
                    documentsArray.push({
                        body: doc.data().body,
                        postID: doc.data().postID,
                        created_at: (new Date(doc.data().created_at))
                    })
                })
                dispatch(fetchedComments(documentsArray));
            })
            .catch(error => console.log(error.message));
    };
};


export const fetchedComments = (data: iComment[]) => {

    return {
        type: ActionTypes.FETCH_ALL_COMMENTS,
        payload: data
    };
};
