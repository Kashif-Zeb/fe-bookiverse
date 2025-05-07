import axios from "axios";
import apiEndpoint from "../../store/apiEndpoint";
import { call,takeLatest,put } from "redux-saga/effects";
import { sendingapiCallFlight,apicallErrorFlight,apicallSuccessFlight } from "./flightSlice";
function* getFlightData(action){
    try{
        const userinfo = localStorage.getItem("access_token") 
        const headers = {
            headers: {  // Note: axios expects headers inside a 'headers' property
              Authorization: `Bearer ${userinfo}`
            }
          };
        const requestURL = `${apiEndpoint}/flight`
        const response = yield call(axios.get,requestURL,headers)
        yield put(apicallSuccessFlight(response.data))
    }
    catch(error){
        yield put(apicallErrorFlight(error.response.data.message))
    }
}


function* watchFlight(){
    yield takeLatest(sendingapiCallFlight.type,getFlightData)
}
export default watchFlight