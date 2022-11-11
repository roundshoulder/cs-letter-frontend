export interface User {
  username: string;
}

export interface AuthResult {
  memberToken: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  exp: number;
  sub: string;
}
