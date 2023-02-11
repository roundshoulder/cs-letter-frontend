import { css } from '@emotion/css';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import logo_black from '../assets/logo_black.svg';

function LeftTitle() {
  const isHome = useLocation().pathname === '/';
  const LeftDiv = css`
    display: none;
    @media screen and (min-width: 768px) {
      display: flex;
      width: 30%;
      color: ${isHome ? '#fafafa' : '#0a0a0a'};
      /* border: solid 2px red; */
    }
  `;
  const fix = css`
    display: flex;
    position: fixed;
    width: 300px;
    height: 95vh;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  `;
  return (
    <div className={LeftDiv}>
      <div className={fix}>
        <img src={isHome ? logo : logo_black} alt="ㅊㅅㅍㅈ" width="160px" />
        <span>
          초성편지를 보내보세요!
          <br />
          <span style={{ color: 'rgba(250, 250, 250, 0.6)' }}>
            본 사이트는 모바일 웹에 최적화되어있습니다.
          </span>
        </span>
      </div>
    </div>
  );
}

export default LeftTitle;
