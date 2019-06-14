// types
import {
  GET_TRIPS_FAILURE,
  GET_TRIPS_REQUEST,
  GET_TRIPS_SUCCESS,
} from './types';

export interface GetAllTripsActionRequest {
  type: GET_TRIPS_REQUEST;
}

export interface GetAllTripsActionSuccess {
  trips: Trip[];
  type: GET_TRIPS_SUCCESS;
}

export interface GetAllTripsActionFailure {
  type: GET_TRIPS_FAILURE;
  errors: any;
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  arrival_date: string;
}
