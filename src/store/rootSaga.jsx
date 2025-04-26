import { all } from "redux-saga/effects";
import  watchRegisterUser from "../containers/register/saga" 
import watchLogin from "../containers/login/loginSaga";

export default function* rootSaga(){
    yield all([
        watchRegisterUser(),
        watchLogin()
    ]);
}