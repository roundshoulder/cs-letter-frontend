import { css } from '@emotion/css';
import { KAKAO_AUTH_URL } from '../api/oauth';

const kakaoButton = css`
  background-color: #000000;
`;

function KakaoButton() {
  return (
    <a href={KAKAO_AUTH_URL}>
      <button className={kakaoButton}>카카오 로그인</button>
    </a>
  );
}

export default KakaoButton;
