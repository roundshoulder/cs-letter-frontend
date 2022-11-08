import axios from 'axios';

export const siteURL = 'https://roundshoulder.github.io/cs-letter-frontend';
// export const siteURL = 'http://localhost:3000/cs-letter-frontend';
export const baseURL = 'http://3.35.186.95:8080';

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