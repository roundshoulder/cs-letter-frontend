import { css } from '@emotion/css';
import { KAKAO_AUTH_URL } from '../api/oauth';
import kakao from '../assets/kakao.svg';
import Theme from '../assets/Theme';

const kakaoButton = css`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 47px;
  border-radius: 12px;
  border: none;
  background-color: #fee500;
  text-decoration: none;
  font-weight: ${Theme.fontWeight.bold};
`;

function KakaoButton() {
  return (
    <a href={KAKAO_AUTH_URL}>
      <button className={kakaoButton}>
        <img src={kakao} height="20" alt="kakao" />
        카카오 로그인
      </button>
    </a>
  );
}

export default KakaoButton;
