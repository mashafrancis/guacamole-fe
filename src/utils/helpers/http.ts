// third-party libraries
import axios from 'axios';

// helper functions
import { authService } from 'utils/auth';

const token = authService.getToken();

const http = axios.create({
  baseURL: process.env.GUACAMOLE_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default http;
