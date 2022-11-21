import { css } from '@emotion/css';
import { MdWarningAmber } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import Theme from '../assets/Theme';

const container = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const title = css`
  font-weight: ${Theme.fontWeight.bold};
  font-size: 18px;
  margin-top: 10px;
`;

function Alert() {
  const pathname = useLocation().pathname;
  return (
    <div className={container}>
      <MdWarningAmber size={60} color={Theme.color.grey} />
      {pathname === '/nopermission' ? (
        <span className={title}>잘못된 접근입니다.</span>
      ) : (
        <span className={title}>페이지를 찾을 수 없습니다.</span>
      )}
      <span>링크를 확인해 주세요.</span>
    </div>
  );
}

export default Alert;
