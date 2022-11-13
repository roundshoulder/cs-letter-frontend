import { css } from '@emotion/css';
import Theme from '../assets/Theme';
import { MdOutlineArrowBack, MdOutlineArrowForward } from 'react-icons/md';

interface Params {
  enable: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  direction: 'back' | 'foward';
}

const arrowButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  font-size: 24px;
`;

const enableStyle = css`
  color: ${Theme.color.white};
  background-color: ${Theme.color.black};
`;

const disableStyle = css`
  color: ${Theme.color.white};
  background-color: ${Theme.color.grey};
`;

function PageNavButton({ onClick, enable, direction }: Params) {
  return (
    <button
      className={`${arrowButton} ${enable ? enableStyle : disableStyle}`}
      onClick={onClick}
      disabled={!enable}
    >
      {direction === 'back' ? (
        <MdOutlineArrowBack color={Theme.color.white} />
      ) : (
        <MdOutlineArrowForward color={Theme.color.white} />
      )}
    </button>
  );
}

export default PageNavButton;
