import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import {createPost} from "../redux/postReducer/Actions";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";


const Background = styled.div`
  background-color: #f89029;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 25vw 5vh 25vw;
`

const TitleInput = styled.input`
  background-color: lightgray;
  width: 100%;
  border:none;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  margin: 2rem 0 1rem 0;
`

const BodyInput = styled.textarea`
  background-color: lightgray;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  min-height: 30vh;
  border:none;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  margin: 1rem 0 1rem 0;
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

const PostButton = styled.button`
  background-color: black;
  font-size:2.5rem;
  color: #f89029;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1.5rem;
  align-self: end;
  margin: 1rem 0 1rem 0;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.1rem;
`


const NewPost = () => {

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = useCallback((title, body) => {
    if (title && body) {
      dispatch(createPost(title, body))
      setTitle("");
      setBody("");
      setSuccessMessage("Posted successfully.");
      setDisplay(true);

      setTimeout(() => {
        history.push("/");
        setDisplay(false);
      }, 1000)

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
    <>

      <Background>
        <TitleInput
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}/>

        <BodyInput
          placeholder="Body"
          value={body}
          onChange={(event) => setBody(event.target.value)}/>

        <PostButton
          onClick={() => handleClick(title, body)}>
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

      </Background>
    </>
  );
};

export default NewPost;