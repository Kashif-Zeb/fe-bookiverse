import {combineReducers} from '@reduxjs/toolkit';
import registerSlice from "../containers/register/registerSlice"
import loginSlice from "../containers/login/loginSlice"

const rootReducer = combineReducers({
    register: registerSlice,
    login:loginSlice
})

export default rootReducer