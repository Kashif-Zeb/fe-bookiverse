import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login_data:{
        data:{},
        loading : false,
        error:null
    }
}


const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        sendingapiCallLogin(state,{payload}){
            state.login_data.loading = true
        },
        apicallSuccessLogin(state, {payload}){
            state.login_data.data = payload
            state.login_data.loading = false
        },
        apicallErrorLogin(state,{payload}){
            state.login_data.loading = false
            state.login_data.error = payload
        }
    }
})

export const {sendingapiCallLogin , apicallErrorLogin, apicallSuccessLogin} = loginSlice.actions

export default loginSlice.reducer