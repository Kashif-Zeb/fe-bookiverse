import { all } from "redux-saga/effects";
import  watchRegisterUser from "../containers/register/saga" 


export default function* rootSaga(){
    yield all([
        watchRegisterUser(),
    ]);
}