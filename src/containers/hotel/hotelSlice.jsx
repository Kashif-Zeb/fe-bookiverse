import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    hotels_data:{
        data :{},
        loading:false,
        error:null
        
    }
}

const hotelSlice = createSlice({
    name:"hotel",
    initialState,
    reducers:{
        sendingapiCallHotel(state,{payload}){
            state.hotels_data.loading = true
            state.hotels_data.error = null
        },
        apicallSuccessHotel(state,{payload}){
            state.hotels_data.data = payload
            state.hotels_data.loading = false
        },
        apicallErrorHotel(state, {payload}){
            state.hotels_data.error = payload
            state.hotels_data.loading = false
        }
    }
})

export const {apicallErrorHotel,apicallSuccessHotel,sendingapiCallHotel} = hotelSlice.actions
export default hotelSlice.reducer