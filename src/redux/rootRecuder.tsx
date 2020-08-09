import {combineReducers} from "redux";
import {postReducer} from "./postReducer/Reducer";

export const rootReducer = combineReducers({postReducer});
