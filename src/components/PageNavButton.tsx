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
  max-width: 35px;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  color: ${Theme.color.white};
`;

const enableStyle = css`
  background-color: ${Theme.color.black};
`;

const disableStyle = css`
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
        <MdOutlineArrowBack size={24} />
      ) : (
        <MdOutlineArrowForward size={24} />
      )}
    </button>
  );
}

export default PageNavButton;
