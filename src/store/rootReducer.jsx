import {combineReducers} from '@reduxjs/toolkit';
import registerSlice from "../containers/register/registerSlice"


const rootReducer = combineReducers({
    register: registerSlice
})

export default rootReducer