import axios from "axios";
import apiEndpoint from "../../store/apiEndpoint"
import {call, put, takeLatest} from "redux-saga/effects"
import {sendingapiCallLogin,apicallErrorLogin,apicallSuccessLogin} from "./loginSlice"


function* login_Api_Call(action){
    try{

        const requestURL = `${apiEndpoint}/login`
        const response = yield call(axios.post,requestURL,action.payload)
        const data = response.data
        yield localStorage.setItem('access_token', data['access_token']);
        yield localStorage.setItem('refresh_token', data['refresh_token']);
        yield localStorage.setItem('user_details', JSON.stringify(data['user_details']));
        yield put(apicallSuccessLogin(response.data))
    }
    catch(error){
        yield put(apicallErrorLogin(error.response.data.message || error.response.data.json))
    }

}

function* watchLogin() {
    yield takeLatest(sendingapiCallLogin.type, login_Api_Call);
  }
  
  export default watchLogin;