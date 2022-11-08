import { css } from '@emotion/css';
import KakaoButton from '../components/KakaoButton';

const intro = css`
  color: #fafafa;
  padding: 26px;
`;

function Home() {
  return (
    <>
      <div className={intro}>초성편지를 보내보세요!</div>
      <KakaoButton />
    </>
  );
}

export default Home;
