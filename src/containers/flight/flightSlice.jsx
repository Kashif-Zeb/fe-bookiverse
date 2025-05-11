import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    flights_data:{
        data :[],
        loading:false,
        error:null
        
    }
}

const flightSlice = createSlice({
    name:"flight",
    initialState,
    reducers:{
        sendingapiCallFlight(state,{payload}){
            state.flights_data.loading = true
            state.flights_data.error = null
        },
        apicallSuccessFlight(state,{payload}){
            state.flights_data.data = payload
            state.flights_data.loading = false
        },
        apicallErrorFlight(state, {payload}){
            state.flights_data.error = payload
            state.flights_data.loading = false
        }
    }
})

export const {apicallErrorFlight,apicallSuccessFlight,sendingapiCallFlight} = flightSlice.actions
export default flightSlice.reducer