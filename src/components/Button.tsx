import { css } from '@emotion/css';
import { ReactNode } from 'react';
import Theme from '../assets/Theme';

const button = css`
  height: 47px;
  width: 100%;
  border: none;
  border-radius: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${Theme.fontWeight.semibold};
`;

type Props = {
  enable?: boolean;
  children: ReactNode;
};

function Button({ enable = true, children }: Props) {
  return <button className={`${button} ${Theme.color[10]}`}>{children}</button>;
}

export default Button;
