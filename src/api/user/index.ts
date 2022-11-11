import client from '../client';
import { getUserResult } from './type';

// 로그인
export async function getUser(memberToken: string) {
  const response = await client.get<getUserResult>(`/member/${memberToken}`);
  return response.data;
}
