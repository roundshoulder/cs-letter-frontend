import { type } from 'os';

export interface User {
  username: string;
}

export interface AuthResult {
  memberToken: string;
  accessToken: string;
  refreshToken: string;
}

// export interface GetUserResult extends User {
//   poolUserId: number;
//   userStatus: 'USER' | 'BRAND_USER' | 'WAITING' | string;
//   follow: boolean;
//   userFollowerCount: number;
//   userFollowingCount: number;
//   brandUserInfoDto: null;
// }

// export interface AuthResult {
//   accessToken: string;
//   refreshToken: string;
// }

// export interface AccessToken {
//   exp: number;
//   nickName: string;
//   role: 'USER' | 'BRAND_USER' | 'WAITING' | string;
//   sub: string;
//   username: string;
// }

// export interface RefreshToken {
//   exp: number;
//   sub: string;
// }

// export interface LoginParams {
//   authorizationCode: string;
// }
