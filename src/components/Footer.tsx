import { css } from '@emotion/css';
import { useLocation } from 'react-router-dom';
import Theme from '../assets/Theme';

const footer = css`
  width: 100%;
  height: 160px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f8f8f8;
  color: #757575;
  position: absolute;
  bottom: 0;
`;

const homeFooter = css`
  background-color: #0a0a0a;
  color: #fafafa;
`;

function Footer() {
  const path = useLocation().pathname;
  return (
    <div className={path !== '/' ? footer : `${footer} ${homeFooter}`}>
      <span style={{ fontWeight: Theme.fontWeight.medium }}>ㅊㅅㅍㅈ</span>
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
