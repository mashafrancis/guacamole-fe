// third-party libraries
import axios from 'axios';

// helper functions
import { authService } from 'utils/auth';

const token = authService.getToken();

const headers = {
  Authorization: `Bearer ${token}`,
};

const http = axios.create({
  // baseURL: 'http://localhost:8000/api/',
  baseURL: 'https://mobilities-api.herokuapp.com/api/',
  headers: authService.isAuthenticated() ? headers : '',
});

export default http;
