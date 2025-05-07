import axios from "axios";
import apiEndpoint from "../../store/apiEndpoint"
import {call, put, takeLatest} from "redux-saga/effects"
import { apicallSuccess,apicallError,sendingapiCall } from "./registerSlice";




function* registerUser(action) {
    try {
      const requestURL = `${apiEndpoint}/register`;
      const response = yield call(axios.post, requestURL, action.payload);
      yield put(apicallSuccess(response.data));
    } catch (error) {
      const status = error.response?.status;
      if (status==='422'){
        yield put(apicallError(error.response.data.message || error.response.data.json || "Failed"));
      }
      else{

        yield put(apicallError(error.response.data.message || error.response.data.json));
      }
    }
  }
  
  // Watcher saga
  function* watchRegisterUser() {
    yield takeLatest(sendingapiCall.type, registerUser);
  }
  
  export default watchRegisterUser;