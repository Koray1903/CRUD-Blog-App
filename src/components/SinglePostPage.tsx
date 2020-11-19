import React, {useState, useEffect, useCallback, useMemo, memo} from "react";
import Comment from "./elements/Comment";
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux';
import {useLocation} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {deletePost, fetchComments, updatePost} from "../redux/Actions";
import {RootState} from "../redux/rootReducer";


const PostFlex = styled.div`
  width: 1000px;
  background-color: lightgray;
  margin-top: 64px;
  border-radius: 32px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  box-shadow: 8px 10px 19px 1px rgba(0,0,0,0.75);
`

const PostTitle = styled.p`
  padding: 18px;
  font-weight: bold;
  margin:0;
  font-size: 32px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  box-sizing: border-box;
`

const PostTitleInput = styled.textarea`
  background: transparent;
  border: 2px solid black;
  padding: 16px;
  border-radius: 16px;
  resize: vertical;
  font-weight: bold;
  font-size: 32px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  box-sizing: border-box;
`

const HorizontalLine = styled.div`
  height: 2px;
  width: 100%;
  background: black;
`

const PostBody = styled.p`
  margin-top: 16px;
  padding-top: 16px;
  font-size: 24px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  line-height: 32px;
  box-sizing: border-box;
  text-align: justify;
  white-space: pre-wrap;
  word-break: break-word;
`

const PostBodyInput = styled.textarea`
  background: transparent;
  height: 500px;
  border: 2px solid black;
  resize: vertical;
  padding: 16px;
  border-radius: 16px;
  font-size: 24px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  margin: 16px 0;
  box-sizing: border-box;
 
`

const EditButton = styled.i`
  font-size: 32px;
  cursor: pointer;
  margin: 8px 0;
  align-self: flex-end;
  :hover{
  color: #f89029;
  }
`

const PostSaveButton = styled.i`
  font-size: 36px;
  cursor: pointer;
  margin: 8px 0;
  align-self: flex-end;
  :hover{
  color: #f89029;
  }
`

const PostDeleteButton = styled.i`
  font-size: 32px;
  cursor: pointer;
  margin-top: 32px;
  align-self: flex-start;
  :hover{
  color: #f89029;
  }
`

export interface Props {
    match: {
        params: {
            postId: string
        }
    }
}


const SinglePostPage = (props: Props) => {

    const postID = props.match.params.postId;

    const post = useSelector((state: RootState) => state.reducer.posts.filter(post => post.postID === postID))[0]
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>("");
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [body, setBody] = useState<string>("");
    const [editBody, setEditBody] = useState<boolean>(false);

    const {pathname} = useLocation();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchComments(postID));
        window.scrollTo(0, 0);
    }, [pathname])

    useMemo(() => {
        setTitle(post.title);
        setBody(post.body);
    }, [post.title, post.body])

    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }, [])

    const handleEditTitle = useCallback(() => {
        setEditTitle(true)
    }, [])

    const handleSaveTitle = useCallback(() => {
        dispatch(updatePost(postID, title, body))
        setTitle(title)
        setEditTitle(false)
    }, [title])

    const handleBodyChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value)
    }, [])

    const handleEditBody = useCallback(() => {
        setEditBody(true)
    }, [])

    const handleSaveBody = useCallback(() => {
        dispatch(updatePost(postID, title, body))
        setBody(body)
        setEditBody(false)
    }, [body])

    const handleDelete = useCallback(() => {
        dispatch(deletePost(postID));
        setTimeout(() => {
            history.push("/");
        }, 500)
    }, [])


    return (
        <>
            {post ?
                <PostFlex>

                    {/* TITLE */}
                    {editTitle ?
                        <>
                            <PostTitleInput
                                value={title}
                                onChange={handleTitleChange}/>

                            <PostSaveButton className="fas fa-save"
                                            onClick={handleSaveTitle}/>

                        </>
                        : <PostTitle>{title}</PostTitle>}

                    {!editTitle ?
                        <EditButton className="fas fa-edit" onClick={handleEditTitle}/>
                        : null}
                    {/* TITLE */}

                    <HorizontalLine/>

                    {/* BODY */}
                    {editBody ?
                        <>
                            <PostBodyInput
                                value={body}
                                onChange={handleBodyChange}/>

                            <PostSaveButton className="fas fa-save"
                                            onClick={handleSaveBody}/>

                        </>
                        : <PostBody>{body}</PostBody>}

                    {!editBody ?
                        <EditButton className="fas fa-edit" onClick={handleEditBody}/>
                        : null}
                    {/* BODY */}

                    <PostDeleteButton className="fas fa-trash-alt" onClick={handleDelete}/>

                </PostFlex>
                : null}

            {/* COMMENTS */}
            <Comment postID={postID}/>
            {/* COMMENTS */}
        </>
    );
};

export default memo(SinglePostPage);
