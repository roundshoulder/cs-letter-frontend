import client from '../client';

// 로그인
export async function login(authorizationCode: string) {
  const response = await client.get(`/oauth/token?code=${authorizationCode}`);
  return {
    accessToken: response.headers.accesstoken,
    refreshToken: response.headers.refreshtoken,
    memberToken: response.data.memberToken,
  };
}
