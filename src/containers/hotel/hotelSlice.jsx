import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    hotels_data:{
        data :{},
        loading:false,
        error:null
        
    },
    hotel_msg:{
        data:{},
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
        },
        sendingApiCallAddHotel(state,{actions}){
            state.hotel_msg.loading = true
            state.hotel_msg.error = null
        },
        apicallSuccessAddHotel(state,{payload}){
            state.hotel_msg.data = payload
            state.hotel_msg.loading = false
        },
        apicallErrorAddHotel(state, {payload}){
            state.hotel_msg.error = payload
            state.hotel_msg.loading = false
        },
    }
})

export const {apicallErrorHotel,apicallSuccessHotel,sendingapiCallHotel,sendingApiCallAddHotel,apicallSuccessAddHotel,apicallErrorAddHotel} = hotelSlice.actions
export default hotelSlice.reducer