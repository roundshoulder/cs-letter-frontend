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
