import React, { ReactNode } from 'react';
import { css } from '@emotion/css';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { PADDING } from '../assets/Theme';

const mainContainer = css`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 480px;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const padding = css`
  padding: ${PADDING}px;
`;

function MainContainer({ children }: { children: ReactNode }) {
  const path = useLocation().pathname;
  return (
    <div className={mainContainer}>
      <Header />
      <div
        className={padding}
        style={path !== '/' ? { backgroundColor: '#FAFAFA' } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export default MainContainer;
