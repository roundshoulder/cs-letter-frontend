import client from '../client';
import { createMessageParams, getMessageParams } from './types';

export async function getMessage({ memberToken, cursor }: getMessageParams) {
  const response = await client.get(
    `/messages/${memberToken}?cursor=${cursor}`
  );
  return response;
}

export async function createMessage(params: createMessageParams) {
  const response = await client.post(`/messages`, params);
  return response;
}
