import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const QUOTES_URL = import.meta.env.VITE_QUOTES_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const quotesClient = axios.create({
  baseURL: QUOTES_URL,
  timeout: 5000,
  params: {
    apikey: API_KEY,
  },
});
