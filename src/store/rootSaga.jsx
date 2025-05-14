import { all } from "redux-saga/effects";
import  watchRegisterUser from "../containers/register/saga" 
import watchLogin from "../containers/login/loginSaga";
import watchFlight from "../containers/flight/flightSaga"
import watchHotel from '../containers/hotel/hotelSaga'
export default function* rootSaga(){
    yield all([
        watchRegisterUser(),
        watchLogin(),
        watchFlight(),
        watchHotel()
    ]);
}