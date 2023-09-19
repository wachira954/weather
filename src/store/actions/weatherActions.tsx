import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { WeatherAction, WeatherData, WeatherError, GET_WEATHER, SET_LOADING, SET_ERROR } from '../types';



export const SET_ALERT = 'SET_ALERT';

interface SetAlertAction {
  type: typeof SET_ALERT;
  payload: string;
}

export type WeatherOrAlertAction = WeatherAction | SetAlertAction;

export const setAlert = (msg: string): SetAlertAction => ({
  type: SET_ALERT,
  payload: msg,
});

export const clearAlert = (): SetAlertAction => ({
  type: SET_ALERT,
  payload: '',
});

// weatherActions.ts
export const getWeather = (lat: number, lon: number): ThunkAction<void, RootState, null, WeatherAction>  => {
  return async (dispatch: ThunkDispatch<RootState, null, WeatherAction>) => {
    try {
      dispatch(setLoading());
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=34&lon=40&appid=895284fb2d2c50a520ea537456963d9c`);

      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: WeatherData = await res.json();
      dispatch({
        type: GET_WEATHER,
        payload: resData
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}


export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING
  }
}

export const setError = (): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: ''
  }
}