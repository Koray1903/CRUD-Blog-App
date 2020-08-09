import React, {useState, useEffect, useCallback, useMemo, memo} from "react";
import Comment from "./elements/Comment";
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux';
import {useLocation} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {deletePost, fetchSinglePost, updatePost} from "../redux/postReducer/Actions";
import {RootState} from "./HomePage";

import editSVG from '../assets/editButton.svg';
import deleteSVG from '../assets/deleteButton.svg';
import saveSVG from '../assets/saveButton.svg';

const Background = styled.div`
  background-color: #f89029;
  min-height:80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 25vw 0 25vw;
`

const PostDiv = styled.div`
  width: 100%;
  background-color: lightgray;
  margin-top: 5vh;
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`

const Title = styled.p`
  padding-bottom: 1rem;
  font-weight: bold;
  margin:0;
  font-size: 2rem;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid black;
  text-transform: uppercase;
`

const TitleInput = styled.input`
  display: block;
  background-color: lightgray;
  border:1px solid black;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 1rem;
`

const Body = styled.p`
  margin-top: 1rem;
  padding-top: 1rem;
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  line-height: 2rem;
`

const BodyInput = styled.textarea`
  background-color: lightgray;
  min-height: max-content;
  border:1px solid black;
  resize: none;
  height: 40vh;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  margin: 1rem 0 1rem 0;
`

const EditButton = styled.img`
  height: 2rem;
  cursor: pointer;
  margin-top:1rem;
  justify-self: end;
  align-self: end;
`

const SaveButton = styled.img`
  height: 2rem;
  cursor: pointer;
  justify-self: end;
  align-self: end;
`

const DeleteButton = styled.img`
  height: 2.5rem;
  cursor: pointer;
  margin-top: 2rem;
  justify-self: start;
  align-self: start;
`

export interface Props {
  match: {
    params: {
      postId: number
    }
  }
}

const SinglePost = (props: Props) => {

  const post = useSelector((state: RootState) => state.postReducer.post)
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const [editBody, setEditBody] = useState<boolean>(false);

  const {pathname} = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchSinglePost(+props.match.params.postId));
    window.scrollTo(0, 0);
  }, [pathname])

  useMemo(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post.title, post.body])


  const handleEditTitle = useCallback(() => {
    setEditTitle(true)
  }, [])

  const handleSaveTitle = useCallback((id: number, title: string, body: string) => {
    dispatch(updatePost(id, title, body))
    setTitle(title)
    setEditTitle(false)
  }, [])


  const handleEditBody = useCallback(() => {
    setEditBody(true)
  }, [])

  const handleSaveBody = useCallback((id: number, title: string, body: string) => {
    dispatch(updatePost(id, title, body))
    setBody(body)
    setEditBody(false)
  }, [])


  const handleDelete = useCallback((id: number) => {
    dispatch(deletePost(id));

    setTimeout(() => {
      history.push("/");
    }, 500)

  }, [])

  return (
    <Background>

      {post ?
        <PostDiv>

          {/* TITLE */}
          {editTitle ?
            <>
              <TitleInput
                value={title}
                onChange={event => setTitle(event.target.value)}/>
              <SaveButton src={saveSVG}
                          onClick={() => handleSaveTitle(post.id, title, body)}
                          alt="save"/>
            </>
            : <Title>{title}</Title>}

          {!editTitle ?
            <EditButton src={editSVG}
                        onClick={handleEditTitle}
                        alt="edit"/> : null}
          {/* TITLE */}

          {/* BODY */}
          {editBody ?
            <>
              <BodyInput
                value={body}
                onChange={event => setBody(event.target.value)}/>
              <SaveButton src={saveSVG}
                          onClick={() => handleSaveBody(post.id, title, body)}
                          alt="save"/>
            </>
            : <Body>{body}</Body>}

          {!editBody ?
            <EditButton src={editSVG}
                        onClick={handleEditBody}
                        alt="edit"/> : null}
          {/* BODY */}

          <DeleteButton src={deleteSVG}
                        onClick={(): void => handleDelete(post.id)}
                        alt="delete"/>

        </PostDiv>
        : null}

      {/* COMMENTS */}
      <Comment id={+props.match.params.postId}/>
      {/* COMMENTS */}

    </Background>
  );
};

export default memo(SinglePost);