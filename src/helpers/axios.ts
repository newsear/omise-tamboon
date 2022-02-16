import axios from 'axios';

export type HttpHookProps = {
  onBeforeComplete?: () => any;
};

export const httpClient = axios.create({
  baseURL: process.env.API_URL,
});
