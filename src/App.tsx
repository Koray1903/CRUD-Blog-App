import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import styled, {createGlobalStyle} from "styled-components"
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import NewPostPage from "./components/NewPostPage";
import SinglePostPage from "./components/SinglePostPage";


const GlobalStyle = createGlobalStyle`
  body {
  background: #f89029;
   margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
`

const Background = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`

const App = () => {

    return (
        <BrowserRouter>

            <Header/>

            <GlobalStyle/>

            <Switch>
                <Background>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/post/:postId" component={SinglePostPage}/>
                    <Route path="/new" component={NewPostPage}/>
                </Background>
            </Switch>

        </BrowserRouter>
    );
}

export default App;
