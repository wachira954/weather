export const GET_WEATHER = 'GET_WEATHER';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_ALERT = 'SET_ALERT';

export interface Weather {
    description : string;
    icon : string;
    id : string;
    main : string;
}
export interface WeatherData {
    name?: string;
    main?: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather?: { main: string }[];
    wind?: { speed: number };
  }
  
export interface WeatherError{
    cod:string;
    message:string;
}

export interface WeatherState{
    [x: string]: any;
    data: WeatherData | null;
    loading: boolean;
    error: string;
}

interface GetWeatherAction{
    type: typeof GET_WEATHER;
    payload: WeatherData;
}

interface SetLoadingAction{
    type: typeof SET_LOADING;
}

interface SetErrorAction{
    type: typeof SET_ERROR;
    payload: string;
}

export type WeatherAction = GetWeatherAction | SetLoadingAction | SetErrorAction;



export interface AlertState{
    message:string;
}


interface SetAlertAction {
  type: typeof SET_ALERT;
  payload: string;
}

export type AlertAction = SetAlertAction;