import React, { ReactNode } from 'react';
import { css } from '@emotion/css';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { PADDING } from '../assets/Theme';
import Footer from './Footer';

const mainContainer = css`
  width: 100%;
  min-height: 100%;
  @media screen and (min-width: 768px) {
    width: 480px;
  }
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const padding = css`
  padding: ${PADDING}px;
`;

function MainContainer({ children }: { children: ReactNode }) {
  const path = useLocation().pathname;
  return (
    <div
      className={mainContainer}
      style={path === '/' ? { backgroundColor: '#0a0a0a' } : undefined}
    >
      {path === '/' ? <></> : <Header />}
      <div className={padding}>{children}</div>
      <Footer />
    </div>
  );
}

export default MainContainer;
