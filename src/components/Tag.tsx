import { css } from '@emotion/css';
import Theme from '../assets/Theme';

const tag = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0px 20px 0px 20px;
  height: 35px;
  border-radius: 35px;
  font-weight: ${Theme.fontWeight.medium};
`;

type Props = {
  color?: number;
  text: string;
};

function Tag({ color = 10, text }: Props) {
  return <div className={`${tag} ${Theme.tagStyle[color]}`}>{text}</div>;
}

export default Tag;
