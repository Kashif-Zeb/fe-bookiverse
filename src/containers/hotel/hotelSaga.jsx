import axiosInstance from "../../store/api";
import apiEndpoint from "../../store/apiEndpoint";
import { call,takeLatest,put } from "redux-saga/effects";
import { sendingapiCallHotel,apicallErrorHotel,apicallSuccessHotel } from "./hotelSlice";
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
            const requestURL = `${apiEndpoint}/hotel?page=${payload.current}&per_page=${payload.pageSize}`
            const response = yield call(axiosInstance.get,requestURL)
            yield put(apicallSuccessHotel(response.data))

        }
    }
    catch(error){
        yield put(apicallErrorHotel(error.response.data.message))
    }
}


function* watchHotel(){
    yield takeLatest(sendingapiCallHotel.type,getHotelData)
}
export default watchHotel