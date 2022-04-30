import { combineReducers } from "redux";
import {authReducer} from "./AuthReducer";
import { creditsReducer } from "./CreditsReducer";
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    auth:authReducer,
    credits:creditsReducer,
    form: formReducer
});
