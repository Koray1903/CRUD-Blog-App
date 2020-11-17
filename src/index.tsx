import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// REDUX
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/lib/integration/react'
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {rootReducer} from "./redux/rootReducer";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
// REDUX

const persistConfig = {
    key: "root",
    storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
)

const persistor = persistStore(store);


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"));
