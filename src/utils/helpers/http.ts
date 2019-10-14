// third-party libraries
import axios from 'axios';

// helper functions
import { authService } from 'utils/auth';

const token = authService.getToken();

const headers = {
  Authorization: `Bearer ${token}`,
};

const http = axios.create({
  baseURL: 'https://mobilities-api.herokuapp.com/',
  headers: authService.isAuthenticated() ? headers : '',
});

export default http;
