export interface getUserResult {
  isMe: boolean;
  kakaoNickname: string;
  kakaoProfileImg: string;
  memberToken: string;
  userCode: number;
  notRead: number;
  solving: number;
  correctMessage: number;
  countMessage: number;
  userRole: 'USER';
}
