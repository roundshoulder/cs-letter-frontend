import { siteURL } from './client';

const REST_API_KEY = '12e53c031e79b63b32a7f4d5ee1fbcf2';
const REDIRECT_URI = `${siteURL}/ouath`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
