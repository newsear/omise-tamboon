import axios from 'axios';

export type HttpHookProps = {
  onCompleted?: () => any;
};

export const httpClient = axios.create({
  baseURL: process.env.API_URL,
});
