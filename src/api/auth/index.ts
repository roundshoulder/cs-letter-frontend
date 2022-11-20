import client from '../client';
import { RefreshParams } from './types';

// 로그인
export async function login(authorizationCode: string) {
  const response = await client.get(`/oauth/token?code=${authorizationCode}`);
  return {
    accessToken: response.headers.accesstoken,
    refreshToken: response.headers.refreshtoken,
    memberToken: response.data.memberToken,
  };
}

export async function refresh(params: RefreshParams) {
  const response = await client.post<RefreshParams>(`/reIssue`, params);
  return response.data;
}
