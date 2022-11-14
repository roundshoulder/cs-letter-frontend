export interface getMessageParams {
  memberToken: string;
  cursor: number;
}

export interface createMessageParams {
  body: string;
  nickname: string;
  toMemberToken: string;
  color: number;
}

export interface Message extends createMessageParams {
  messageId: number;
  haveNextMessage: boolean;
  time: string;
  isCorrect: boolean;
}

export interface getDetailMessageResult extends createMessageParams {
  body: string;
  color: number;
  messageId: number;
  nickname: string;
  time: string;
  toMemberToken: string;
  markingResult: markingResult;
}

export interface markingParams {
  body: string;
  messageId: number;
}

export interface markingResult {
  body: string | null;
  result: boolean[] | null;
  isCorrect: boolean;
  count: number;
  totalCount: number;
}
