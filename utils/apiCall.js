import axios from 'axios';
import { api } from './values';

export const apiCall = async (url, method, data, headers) => {
  let result;
  try {
    result = await axios.request({
      // withCredentials: true,
      baseURL: api,
      url: url,
      method,
      data: data,
      headers: headers,
    });
  } catch (error) {
    result = error;
  }

  return result;
};
