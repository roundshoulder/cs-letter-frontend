import { applyToken } from '../api/client';

function useAuthLoadEffect() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    applyToken(accessToken);
  }
}

export default useAuthLoadEffect;
