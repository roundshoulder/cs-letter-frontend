import client from '../client';
import {
  createMessageParams,
  getDetailMessageResult,
  getMessageParams,
  markingParams,
  Message,
} from './types';

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

export async function getDetailMessage(messageId: string) {
  const response = await client.get<getDetailMessageResult>(
    `/message/${messageId}`
  );
  return response.data;
}

export async function marking(params: markingParams) {
  const response = await client.post(`/marking`, params);
  return response.data;
}
