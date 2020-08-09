import React, {useCallback, useState, memo} from 'react';
import styled from "styled-components";
import {createComment, fetchComments} from "../../redux/postReducer/Actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../HomePage";

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5vh 0 10vh 0;
  width: 100%;
`

const Title = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: bold
`

const CommentDiv = styled.div`
  width: 80%;
  background-color: lightgray;
  margin-top: 5vh;
  border-radius: 1rem;
  padding: 1rem;
`
const Body = styled.p`
  margin:0;
  font-size: 1.3rem;
  font-family: 'Montserrat', sans-serif;
`

const CommentInput = styled.textarea`
  background-color: lightgray;
  border:none;
  width: 60%;
  min-width: 60%;
  max-width: 60%;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1.3rem;
  font-family: 'Montserrat', sans-serif;
  margin: 5vh 0 0 0;
`

const PostButton = styled.button`
  background-color: black;
  font-size:2rem;
  color: #f89029;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1.5rem;
  margin: 5vh 0 5vh 0;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.1rem;
  :hover{
    opacity:0.8
  }
`

const SuccessMessage = styled.p`
  font-size:1.5rem;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`

const ErrorMessage = styled.p`
  font-size:1.5rem;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`

interface Comment {
  id: number,
  postID: number,
  body: string
}


const Comment = (props: { id: number }) => {

  const comments = useSelector((state: RootState) => state.postReducer.post.comments)
  const dispatch = useDispatch();

  const [comment, setComment] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleComment = useCallback((comment) => {
    if (comment) {
      dispatch(createComment(props.id, comment))
      setComment("");
      setSuccessMessage("Posted successfully.");
      setDisplay(true);

      setTimeout(() => {
        setDisplay(false);
        dispatch(fetchComments(props.id));
      }, 1000);

    } else {
      setErrorMessage("Please fill in all required fields");
      setDisplay(true);

      setTimeout(() => {
        setErrorMessage("");
        setDisplay(false);
      }, 1000)
    }
  }, [])

  return (
    <FlexDiv>
      <Title>Comments</Title>

      {comments ? comments.map((comment: Comment) => (
        <CommentDiv key={comment.id}>
          <Body>{comment.body}</Body>
        </CommentDiv>
      )) : null}

      <CommentInput
        placeholder="Enter your comment here"
        value={comment}
        onChange={(event) => setComment(event.target.value)}/>

      <PostButton
        onClick={() => handleComment(comment)}>
        Post
      </PostButton>

      <SuccessMessage
        style={{display: display ? "block" : "none"}}>
        {successMessage}
      </SuccessMessage>

      <ErrorMessage
        style={{display: display ? "block" : "none"}}>
        {errorMessage}
      </ErrorMessage>
    </FlexDiv>
  );
};

export default memo(Comment);