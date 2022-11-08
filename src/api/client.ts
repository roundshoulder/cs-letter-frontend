import axios from 'axios';

export const baseURL =
  'https://roundshoulder.github.io/cs-letter-frontend/ouath';
// export const baseURL = 'http://localhost:3000/cs-letter-frontend';

const client = axios.create({
  baseURL,
});

export function applyToken(jwt: string) {
  client.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
  delete client.defaults.headers.common.Authorization;
}

export default client;
