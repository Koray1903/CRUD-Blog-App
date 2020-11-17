import React, {useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {createGlobalStyle} from "styled-components"
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import NewPost from "./components/NewPost";
import SinglePost from "./components/SinglePost";

// import {fetchAllPosts} from "./redux/postReducer/Actions";
// import {Dispatch} from "redux"
// import {useDispatch} from "react-redux";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f89029;
  }
`

const App = () => {

    // const dispatch: Dispatch<any> = useDispatch()
    //
    // useEffect(() => {
    //     dispatch(fetchAllPosts());
    //     window.scrollTo(0, 0);
    // }, []);

    return (
        <>
            <BrowserRouter>
                {/*<Switch>*/}
                    <GlobalStyle/>
                    <Header/>
                    <Route path="/" component={HomePage}/>
                    <Route path="/new" component={NewPost}/>
                    <Route path="/post/:postId" component={SinglePost}/>
                {/*</Switch>*/}
            </BrowserRouter>
        </>
    );
}

export default App;
