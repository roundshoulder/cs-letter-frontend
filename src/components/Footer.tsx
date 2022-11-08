import { css } from '@emotion/css';
import { useLocation } from 'react-router-dom';
import Theme from '../assets/Theme';

function Footer() {
  const isHome = useLocation().pathname === '/';
  const footer = css`
    width: 100%;
    height: 160px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: ${isHome ? '#0a0a0a' : '#f8f8f8'};
    color: ${isHome ? '#fafafa' : '#757575'};
    position: absolute;
    bottom: 0;
  `;

  return (
    <div className={footer}>
      <span style={{ fontWeight: Theme.fontWeight.medium, fontSize: '16px' }}>
        ㅊㅅㅍㅈ
      </span>
      <div>
        <span>
          © 2022 Name all rights reserved.
          <br />
          Contact email@email.com
        </span>
      </div>
    </div>
  );
}

export default Footer;
