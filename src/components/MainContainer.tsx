import React, { ReactNode } from 'react';
import { css } from '@emotion/css';

const mainContainer = css`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 480px;
  }
  display: flex;
  justify-content: center;
  background-color: #f3f3f3;
`;

function MainContainer({ children }: { children: ReactNode }) {
  return <div className={mainContainer}>{children}</div>;
}

export default MainContainer;
