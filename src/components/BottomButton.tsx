import { css } from '@emotion/css';
import { ReactNode } from 'react';
import Theme from '../assets/Theme';
import { MdShare } from 'react-icons/md';

type Props = {
  children: ReactNode;
  enable?: boolean;
  isShare?: boolean;
  isCorrect?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function BottomButton({
  children,
  enable = true,
  isShare = false,
  isCorrect = false,
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
    background-color: ${isCorrect || enable
      ? Theme.color.black
      : Theme.color.grey};
  `;

  return (
    <button
      className={button}
      onClick={onClick}
      disabled={isCorrect || !enable}
    >
      {isShare && <MdShare size={22} />}
      {children}
    </button>
  );
}

export default BottomButton;
