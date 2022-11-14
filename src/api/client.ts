import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const siteURL = 'https://chosung-letter.com';
// export const siteURL = 'http://localhost:3000';
export const baseURL = 'https://api.chosung-letter.com';

const client = axios.create({
  baseURL,
});

function Logout() {
  const navigate = useNavigate();
  clearToken();
  localStorage.clear();
  navigate('/');
}

client.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const exception = error.response?.data?.exception;
    // 토큰이 없을 경우 재로그인
    if (exception === 'java.lang.ClassCastException') {
      Logout();
    }

    // (1) 만료된 문제면 -> 리프레시 시키고 재요청
    // (3) 토큰 있는데 본인 아니면 -> 잘못된 접근입니다. 페이지 보내기
    // if (error.response?.status === 500) {
    //   clearToken();
    //   const previousRequest = error.config;
    //   const auth = await authStorage.get();
    //   if (auth) {
    //     await refresh(auth).then((value: AuthResult) => {
    //       if (previousRequest.headers === undefined) {
    //         previousRequest.headers = {};
    //       }
    //       dispatch(authorize(value.accessToken));
    //       previousRequest.headers.Authorization = `Bearer ${value.accessToken}`;
    //       authStorage.set(value);
    //     });
    //   }
    //   return axios(previousRequest);
    // } else {
    // throw error;
    // }
  }
);

export function applyToken(jwt: string) {
  client.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
  delete client.defaults.headers.common.Authorization;
}

export default client;
