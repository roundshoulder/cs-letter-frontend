import axios from 'axios';

export const siteURL = 'https://chosung-letter.com';
// export const siteURL = 'http://localhost:3000';
export const baseURL = 'https://api.chosung-letter.com';

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
