import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useQuery } from 'react-query';

function KakaoRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const authorizationCode = location.search.split('=')[1];

  useQuery('login', () => login(authorizationCode), {
    onSuccess: data => {
      console.log(data);
      navigate('/user');
    },
  });

  return <></>;
}

export default KakaoRedirectHandler;
