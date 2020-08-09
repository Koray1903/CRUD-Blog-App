import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/lib/integration/react'
import {store, persistor} from "./redux/store";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import NewPost from "./components/NewPost";
import SinglePost from "./components/SinglePost";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f89029;
  }
`

function App() {
  return (
    <Router>
      <Switch>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <GlobalStyle/>
            <Header/>
            <Route exact path="/" component={HomePage}/>
            <Route path="/new" component={NewPost}/>
            <Route path="/post/:postId" component={SinglePost}/>
          </PersistGate>
        </Provider>
      </Switch>
    </Router>
  );
}

export default App;
