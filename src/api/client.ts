import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NavigateFunction } from 'react-router-dom';
import { refresh } from './auth';
import { RefreshParams } from './auth/types';

export const siteURL = 'https://chosung-letter.com';
// export const siteURL = 'http://localhost:3000';
export const baseURL = 'https://api.chosung-letter.com';

const client = axios.create({
  baseURL,
});

export const setupInterceptor = (navigate: NavigateFunction) => {
  client.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const exception = error.response?.data?.exception;
      console.log(exception);
      // No Element
      if (exception === 'java.util.NoSuchElementException') {
        navigate('/notfound');
      }

      // Token Expired
      if (exception === 'com.auth0.jwt.exceptions.TokenExpiredException') {
        const previousRequest = error.config;
        const date = new Date();
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
          const decodedRefreshToken: { exp: number } = jwtDecode(refreshToken);
          const isExpired = decodedRefreshToken.exp * 1000 < date.getTime();
          if (isExpired) {
            console.log('refresh도 만료!');
            // Refresh Token Expired
            clearToken();
            localStorage.clear();
            navigate('/');
          } else {
            // Access Token Expired
            if (previousRequest.headers === undefined) {
              previousRequest.headers = {};
            }
            clearToken();
            if (accessToken && refreshToken) {
              refresh({ accessToken, refreshToken }).then(
                ({ accessToken, refreshToken }: RefreshParams) => {
                  applyToken(accessToken);
                  localStorage.setItem('accessToken', accessToken);
                  localStorage.setItem('refreshToken', refreshToken);
                  previousRequest.headers.Authorization = `Bearer ${accessToken}`;
                }
              );
            }
          }
        }
        return axios(previousRequest);
      }
      // Need Token
      if (exception === 'java.lang.ClassCastException') {
        console.log('토큰 필요');
        alert('토큰 없음');
      }

      // No Permission
      if (
        exception === 'com.project.csletter.member.exception.MemberException'
      ) {
        navigate('/nopermission');
      }
    }
  );
};

export function applyToken(jwt: string) {
  client.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
  delete client.defaults.headers.common.Authorization;
}

export default client;
