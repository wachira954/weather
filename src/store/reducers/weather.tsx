/* eslint-disable import/no-anonymous-default-export */
import {WeatherAction, WeatherState} from "../types";

const initialState: WeatherState = {
    data: null,
    loading:false,
    error:''
}
// Define RootState based on your Redux store structure
export type RootState = {
    weather: WeatherState;
}
export default (State = initialState, action: WeatherAction): WeatherState => {
    switch(action.type){
        case "GET_WEATHER":
            return{
                data: action.payload,
                loading:false,
                error:'',
            }
        case "SET_LOADING":
            return{
                ...State,
                loading:true,
            }
        case "SET_ERROR":
            return{
                ...State,
                error:action.payload,
                loading:false,
            }
            default:
            return State;
    }
}