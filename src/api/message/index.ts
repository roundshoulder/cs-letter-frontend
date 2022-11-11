import client from '../client';
import { getMessageParams } from './types';

// 로그인
export async function getMessage({ memberToken, cursor }: getMessageParams) {
  const response = await client.get(
    `/messages/${memberToken}?cursor=${cursor}`
  );
  return response;
}
