import React, {useCallback, useState, memo} from 'react';
import styled from "styled-components";
import {createComment, fetchComments} from "../../redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {iComment} from "../../redux/Types";
import {v4 as uuidv4} from "uuid";

const CommentFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 48px 0 32px 0;
`

const CommentTitle = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: bold
`

const CommentDiv = styled.div`
  width: 750px;
  background-color: lightgray;
  margin-top: 32px;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 8px 10px 19px 1px rgba(0,0,0,0.75);
`

const CommentBody = styled.p`
  margin:0;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  text-align: justify;
  white-space: pre-wrap;
  word-break: break-word;
`

const CommentInput = styled.textarea`
  background: lightgray;
  border:none;
  width: 500px;
  resize: vertical;
  padding: 32px;
  border-radius: 16px;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 8px 10px 19px 1px rgba(0,0,0,0.75);
  margin: 24px 0;
  :focus {
  outline: none;
  }
`

const CommentPostButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  background: black;
  font-size: 32px;
  color: #f89029;
  border: none;
  border-radius: 16px;
  padding: 8px 30px;
  margin: 24px 0 0 0;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 2px;
  :hover{
    opacity:0.8
  }
  :focus {
  outline: none;
  }
`

const PostIcon = styled.i`
  font-size: 32px;
  color: #f89029;
`

const CommentMessage = styled.div`
  width:100%;
  height: 24px;
  text-align: center;
`

const Success = styled.span`
  font-size: 24px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  height: 30px;
  display: inline;
`

const Error = styled.span`
  font-size: 24px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  height: 30px;
  display: inline;
`


const Comment = (props: { postID: string }) => {

    const comments = useSelector((state: RootState) => state.reducer.comments.sort(
        (a, b) => {
            if (a.created_at < b.created_at) return +1;
            if (a.created_at > b.created_at) return -1;
            return 0;
        }
    ))

    const dispatch = useDispatch();

    const [comment, setComment] = useState<string>("");
    const [display, setDisplay] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handlePostComment = useCallback(() => {

        if (comment) {
            const commentID = uuidv4();
            dispatch(createComment(props.postID, comment, commentID))
            setComment("");
            setSuccessMessage("Posted successfully.");
            setDisplay(true);

            setTimeout(() => {
                setSuccessMessage("");
                setDisplay(false);
                dispatch(fetchComments(props.postID));
            }, 1000);

        } else {
            setErrorMessage("Please fill in all required fields");
            setDisplay(true);

            setTimeout(() => {
                setErrorMessage("");
                setDisplay(false);
            }, 1000)
        }
    }, [comment])

    const handleCommentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }, [])


    return (
        <CommentFlex>

            <CommentTitle>Comments</CommentTitle>

            {comments ? comments.map((comment: iComment, index: number) => ( // ??????????
                <CommentDiv key={index}>
                    <CommentBody>{comment.body}</CommentBody>

                </CommentDiv>
            )) : null}

            <CommentInput
                placeholder="Enter your comment here"
                value={comment}
                onChange={handleCommentChange}/>

            <CommentMessage>
                <Success
                    style={{display: display ? "inline" : "hidden"}}>
                    {successMessage}
                </Success>

                <Error
                    style={{display: display ? "inline" : "hidden"}}>
                    {errorMessage}
                </Error>
            </CommentMessage>

            <CommentPostButton
                onClick={handlePostComment}>
                Post
                <PostIcon className="fas fa-paper-plane"/>
            </CommentPostButton>

        </CommentFlex>
    );
};

export default memo(Comment);
