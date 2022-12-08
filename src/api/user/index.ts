import client from '../client';
import { getUserResult } from './type';

export async function getUser(memberToken: string) {
  const response = await client.get<getUserResult>(`/member/${memberToken}`);
  return response.data;
}

export async function getUserName(memberToken: string) {
  const response = await client.get<string>(`/member/name/${memberToken}`);
  return response.data;
}

export async function updateProfile(formData: FormData) {
  const response = await client.post('/member', formData);
  return response;
}
