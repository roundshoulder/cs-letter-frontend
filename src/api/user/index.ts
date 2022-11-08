import client from '../client';

// 로그인
export async function getUser(authorizationCode: string) {
  const response = await client.get(`/oauth/token?code=${authorizationCode}`);
  return response.headers;
}
