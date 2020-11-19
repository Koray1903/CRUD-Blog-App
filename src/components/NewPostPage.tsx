import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import {createNewPost} from "../redux/Actions";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {v4 as uuidv4} from "uuid";

const NewPostTitleInput = styled.input`
  background-color: lightgray;
  width: 750px;
  border:none;
  padding: 16px;
  border-radius: 16px;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 64px 0 16px 0;
  box-shadow: 8px 10px 19px 1px rgba(0,0,0,0.75);
  :focus {
  outline: none;
  }
`

const NewPostBodyInput = styled.textarea`
  background-color: lightgray;
  width: 750px;
  resize: vertical;
  min-height: 250px;
  border:none;
  padding: 16px;
  border-radius: 16px;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 16px 0 32px 0;
  box-shadow: 8px 10px 19px 1px rgba(0,0,0,0.75);
  :focus {
  outline: none;
  }
 
`

const SuccessMessage = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  font-weight: 600;
`

const ErrorMessage = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  font-weight: 600;
`

const NewPostButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  font-weight: 600;
  background-color: black;
  font-size: 32px;
  color: #f89029;
  border: none;
  border-radius: 16px;
  padding: 8px 30px;
  margin: 16px 0 16px 0;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 2px;
  :hover{
    opacity:0.8
  }
`

const PostIcon = styled.i`
  font-size: 32px;
  color: #f89029;
`


const NewPostPage = () => {

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const dispatch = useDispatch();

    const history = useHistory();


    const handleCreatePost = useCallback(() => {

        if (title && body) {

            const postID = uuidv4();

            dispatch(createNewPost(title, body, postID))
            setTitle("");
            setBody("");

            setSuccessMessage("Posted successfully.");
            setShowMessage(true);

            setTimeout(() => {
                history.push("/");
                setShowMessage(false);
                setSuccessMessage("");
            }, 1000)

        } else {
            setErrorMessage("Please fill in all required fields");
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
                setErrorMessage("");
            }, 1000)
        }
    }, [title, body])


    const handleBodyChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value)
    }, [])


    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }, [])


    return (
        <>
            <NewPostTitleInput
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}/>

            <NewPostBodyInput
                placeholder="Body"
                value={body}
                onChange={handleBodyChange}/>

            <SuccessMessage
                style={{display: showMessage ? "inline" : "hidden"}}>
                {successMessage}
            </SuccessMessage>

            <ErrorMessage
                style={{display: showMessage ? "inline" : "hidden"}}>
                {errorMessage}
            </ErrorMessage>

            <NewPostButton
                onClick={handleCreatePost}>
                Post
                <PostIcon className="fas fa-paper-plane"/>
            </NewPostButton>
        </>
    )
};

export default NewPostPage;
