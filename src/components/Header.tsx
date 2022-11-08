import React from 'react';

import { css } from '@emotion/css';

const headerContainer = css`
  height: 60px;
  color: white;
  background-color: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Header() {
  return <div className={headerContainer}>ㅊㅅㅍㅈ</div>;
}

export default Header;