import client from '../client';
import { createMessageParams, getMessageParams, Message } from './types';

export async function getMessage({ memberToken, cursor }: getMessageParams) {
  const response = await client.get<Message[]>(
    `/messages/${memberToken}?cursor=${cursor}`
  );
  return response.data;
}

export async function createMessage(params: createMessageParams) {
  const response = await client.post(`/message`, params);
  return response;
}
