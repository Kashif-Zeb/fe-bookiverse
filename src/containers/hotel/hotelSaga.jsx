import axiosInstance from "../../store/api";
import apiEndpoint from "../../store/apiEndpoint";
import { call,takeLatest,put } from "redux-saga/effects";
import { sendingapiCallHotel,apicallErrorHotel,apicallSuccessHotel,sendingApiCallAddHotel,apicallSuccessAddHotel,apicallErrorAddHotel } from "./hotelSlice";
import { act } from "react";
function* getHotelData(action){
    try{
      
        const payload = action.payload;
        if(payload){
            const searchKeys = ['hotel_name', 'hotel_rooms'];
        const params = new URLSearchParams();
        searchKeys.forEach(key => {
            if (payload[key]) {
              params.append('search', payload[key]);
            }
          });
        Object.keys(payload).forEach(key => {
            if (!searchKeys.includes(key) && payload[key] !== undefined && payload[key] !== '') {
              params.append(key, payload[key]);
            }
          });
        const requestURL = `${apiEndpoint}/hotel?${params.toString()}`
        const response = yield call(axiosInstance.get,requestURL)
        yield put(apicallSuccessHotel(response.data))
        }
        else{
            const requestURL = `${apiEndpoint}/hotel?page=${payload.page}&per_page=${payload.pageSize}`
            const response = yield call(axiosInstance.get,requestURL)
            yield put(apicallSuccessHotel(response.data))

        }
    }
    catch(error){
        yield put(apicallErrorHotel(error.response.data.message))
    }
}

function* addHotel(action){
  try{
    const requestURL = `${apiEndpoint}/hotel`
    const response = yield call(axiosInstance.post,requestURL,action.payload)
    if (response.status===200){
      const msg = {
        "msg":"hotel data is added successfully"
      }
      yield put(apicallSuccessAddHotel(msg))
    }

  }
  catch(error){
    yield apicallErrorAddHotel(error.response?.data?.message || error.response?.data?.json || "Something went wrong")
  }
}

function* watchHotel(){
    yield takeLatest(sendingapiCallHotel.type,getHotelData)
    yield takeLatest(sendingApiCallAddHotel.type,addHotel)
}
export default watchHotel