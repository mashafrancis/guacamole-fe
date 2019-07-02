import { UserDetails } from 'modules/user/interfaces';

// types
import {
  ADD_TRIPS_FAILURE,
  ADD_TRIPS_REQUEST,
  ADD_TRIPS_SUCCESS,
  GET_SINGLE_TRIP_FAILURE,
  GET_SINGLE_TRIP_REQUEST,
  GET_SINGLE_TRIP_SUCCESS,
  GET_TRIPS_FAILURE,
  GET_TRIPS_REQUEST,
  GET_TRIPS_SUCCESS,
  GET_USER_TRIPS_FAILURE,
  GET_USER_TRIPS_REQUEST,
  GET_USER_TRIPS_SUCCESS,
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

export interface AddTripActionRequest {
  type: ADD_TRIPS_REQUEST;
}

export interface AddTripActionSuccess {
  trip: NewTrip;
  type: ADD_TRIPS_SUCCESS;
}

export interface AddTripsActionFailure {
  type: ADD_TRIPS_FAILURE;
  errors: any;
}

export interface GetSingleTripActionRequest {
  type: GET_SINGLE_TRIP_REQUEST;
}

export interface GetSingleTripActionSuccess {
  trip: Trip;
  type: GET_SINGLE_TRIP_SUCCESS;
}

export interface GetSingleTripActionFailure {
  type: GET_SINGLE_TRIP_FAILURE;
  errors: any;
}

export interface GetUserTripsActionRequest {
  type: GET_USER_TRIPS_REQUEST;
}

export interface GetUserTripsActionSuccess {
  user_trips: Trip[];
  type: GET_USER_TRIPS_SUCCESS;
}

export interface GetUserTripsActionFailure {
  type: GET_USER_TRIPS_FAILURE;
  errors: any;
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  arrival_date: string;
  traveller?: UserDetails;
}

export interface NewTrip {
  origin: string;
  destination: string;
  departure_date: string;
  arrival_date: string;
}
