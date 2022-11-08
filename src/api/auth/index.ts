import client from '../client';

// 로그인
export async function login(authorizationCode: string) {
  const response = await client.post(`/oauth/token?code=${authorizationCode}`);
  return response.headers;
}
