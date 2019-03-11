// third-party libraries
import axios from 'axios';

// thunk
import { displayInternalServerErrorMessage } from 'modules/internalServerError';

// store
import store from '../../store/index';

// helpers
import { authService } from 'utils/auth';
import CacheHandler from 'utils/helpers/CacheHandler';

const token = authService.getToken();

const http = axios.create({
  baseURL: process.env.GUACAMOLE_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

http.interceptors.request.use((config) => {
  if (authService.isExpired()) {
    authService.redirectUser();
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const endpoint = CacheHandler.extractUrlEndpoint(url);

    if (method !== 'get' && endpoint) {
      const requestTimestamp = (new Date).getTime();
      CacheHandler.cacheInvalidationRegister[endpoint] = requestTimestamp;
    }

    return response;
  },
  (error) => {
    if (error.response.status === 500 && error.response.data.message.includes('token')) {
      authService.redirectUser();
    } else if (error.response.status === 500) {
      store.dispatch(displayInternalServerErrorMessage(true));
    }

    return Promise.reject(error);
  }
);

export default http;
