import React, { ReactNode } from 'react';
import { css } from '@emotion/css';

const mainContainer = css`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 480px;
  }
`;

function MainContainer({ children }: { children: ReactNode }) {
  return <div className={mainContainer}>{children}</div>;
}

export default MainContainer;
