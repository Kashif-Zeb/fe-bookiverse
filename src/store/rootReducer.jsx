import {combineReducers} from '@reduxjs/toolkit';
import registerSlice from "../containers/register/registerSlice"
import loginSlice from "../containers/login/loginSlice"
import flightSlice from "../containers/flight/flightSlice"
const rootReducer = combineReducers({
    register: registerSlice,
    login:loginSlice,
    flight:flightSlice
})

export default rootReducer