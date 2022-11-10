import { css } from '@emotion/css';
import { ReactNode } from 'react';
import Theme from '../assets/Theme';
import { MdShare } from 'react-icons/md';

type Props = {
  enable?: boolean;
  isShare?: boolean;
  children: ReactNode;
};

function BottomButton({ enable = true, isShare = false, children }: Props) {
  const button = css`
    gap: 16px;
    width: 100%;
    height: 47px;
    border-radius: 47px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${Theme.fontWeight.semibold};
    color: ${enable ? Theme.color.white : Theme.color.black};
    background-color: ${enable ? Theme.color.black : Theme.color.white};
  `;

  return (
    <button className={button}>
      {isShare && <MdShare size={22} />}
      {children}
    </button>
  );
}

export default BottomButton;
