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
  haveSecondLine: boolean;
  time: string;
  isCorrect: boolean;
  isRead: boolean;
  nextCursor: number;
  prevCursor: number;
}

export interface getDetailMessageResult {
  body: string[];
  nickname: string;
  toMemberToken: string;
  color: number;
  messageId: number;
  time: string;
  markingResult: markingResult;
}

export interface markingParams {
  body: string[];
  messageId: number;
}

export interface markingResult {
  body: string[] | null;
  result: boolean[][] | null;
  isCorrect: boolean;
  count: number;
  totalCount: number;
}
