import { css } from '@emotion/css';
import { ReactNode } from 'react';
import Theme from '../assets/Theme';
import { MdShare } from 'react-icons/md';

type Props = {
  enable?: boolean;
  isShare?: boolean;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function BottomButton({
  enable = true,
  isShare = false,
  children,
  onClick,
}: Props) {
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
    color: ${Theme.color.white};
    background-color: ${enable ? Theme.color.black : Theme.color.grey};
  `;

  return (
    <button className={button} onClick={onClick}>
      {isShare && <MdShare size={22} />}
      {children}
    </button>
  );
}

export default BottomButton;
