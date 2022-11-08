import { ReactNode } from 'react';
import { css } from '@emotion/css';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { PADDING } from '../assets/Theme';
import Footer from './Footer';

const contentsContainer = css`
  padding: ${PADDING}px;
  flex-grow: 1;
`;

function MainContainer({ children }: { children: ReactNode }) {
  const isHome = useLocation().pathname === '/';
  const mainContainer = css`
    width: 100%;
    min-height: 100%;
    @media screen and (min-width: 768px) {
      width: 480px;
    }
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: ${isHome ? '#0a0a0a' : undefined};
  `;
  return (
    <div className={mainContainer}>
      {!isHome && <Header />}
      <div className={contentsContainer}>{children}</div>
      <Footer />
    </div>
  );
}

export default MainContainer;
