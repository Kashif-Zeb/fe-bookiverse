import axiosInstance from "../../store/api";
import apiEndpoint from "../../store/apiEndpoint";
import { call,takeLatest,put } from "redux-saga/effects";
import { sendingapiCallFlight,apicallErrorFlight,apicallSuccessFlight } from "./flightSlice";
function* getFlightData(action){
    try{
        
        const payload = action.payload;
        if(payload){
            const searchKeys = ['flight_name', 'plane_name', 'flight_origin', 'flight_departure'];
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
        const requestURL = `${apiEndpoint}/flight/?${params.toString()}`
        const response = yield call(axiosInstance.get,requestURL)
        yield put(apicallSuccessFlight(response.data))
        }
        else{
            const requestURL = `${apiEndpoint}/flight/?`
            const response = yield call(axiosInstance.get,requestURL)
            yield put(apicallSuccessFlight(response.data))

        }
    }
    catch(error){
        yield put(apicallErrorFlight(error.response.data.message))
    }
}


function* watchFlight(){
    yield takeLatest(sendingapiCallFlight.type,getFlightData)
}
export default watchFlight