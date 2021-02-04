/* eslint-disable no-param-reassign */
import axios from 'axios';
import queryString from 'query-string';
import configs from 'config/api.json';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async config => {
  if (config.url) {
    const [path, qString] = config.url.split(/[?#]/);

    const params = queryString.parse(qString);

    if (!params.api_key) params.api_key = configs.key;

    config.url = `${config.baseURL}${path}?${queryString.stringify(params)}`;
  }

  console.log(config.url);

  return config;
});

export default api;
