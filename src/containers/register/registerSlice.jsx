import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
    registeration_data : {
        data:"",
        loading:false,
        error:null
    }
} 

const registerSlice = createSlice({
    name:"register",
    initialState,
    reducers:{
        sendingapiCall(state){
            state.registeration_data.loading = true;
            state.registeration_data.error = null;
        },
        apicallSuccess(state,{payload}){
            state.registeration_data.data = payload
            state.registeration_data.loading = false
        },
        apicallError(state,{payload}){
            state.registeration_data.error = payload
            state.registeration_data.loading=false
        }
    }
})

export const {sendingapiCall,apicallError,apicallSuccess} = registerSlice.actions
export default registerSlice.reducer
