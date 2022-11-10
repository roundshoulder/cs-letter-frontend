import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useQuery } from 'react-query';
import { AuthResult } from '../api/auth/types';
import { applyToken } from '../api/client';

function KakaoRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const authorizationCode = location.search.split('=')[1];

  useQuery('login', () => login(authorizationCode), {
    onSuccess: (data: AuthResult) => {
      const { memberToken, accessToken, refreshToken } = data;
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('memberToken', memberToken);
      applyToken(accessToken);
      navigate(`/${memberToken}`);
    },
  });

  return <></>;
}

export default KakaoRedirectHandler;
