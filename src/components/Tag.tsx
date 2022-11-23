import { css } from '@emotion/css';
import Theme from '../assets/Theme';

type Props = {
  color?: number;
  type?: 'default' | 'mobileHome' | 'webHome';
  text: string;
  isSquare?: boolean;
};

const typeStyle = {
  default: { height: '35px', fontSize: '16px', padding: '0px 20px' },
  mobileHome: { height: '60px', fontSize: '30px', padding: '0px 25px' },
  webHome: { height: '100px', fontSize: '50px', padding: '0px 30px' },
};

function Tag({ color = 10, text, type = 'default', isSquare = false }: Props) {
  const tag = css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: fit-content;
    padding: ${typeStyle[type].padding};
    height: ${typeStyle[type].height};
    border-radius: ${isSquare ? '0px' : '100px'};
    font-size: ${typeStyle[type].fontSize};
    font-weight: ${Theme.fontWeight.medium};
  `;
  return <div className={`${tag} ${Theme.tagStyle[color]}`}>{text}</div>;
}

export default Tag;
