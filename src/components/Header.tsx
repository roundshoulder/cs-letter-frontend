import logo from '../assets/logo.svg';
import { css } from '@emotion/css';
import {
  MdOutlineArrowBackIos,
  MdLogout,
  MdPermIdentity,
} from 'react-icons/md';
import Theme, { PADDING } from '../assets/Theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearToken } from '../api/client';

const headerContainer = css`
  height: 60px;
  color: white;
  background-color: #0a0a0a;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const iconContainer = css`
  width: 70px;
  padding: 0px ${PADDING}px 0px ${PADDING}px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const iconButton = css`
  border: none;
  background: none;
  color: ${Theme.color.white};
`;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginUser = !!localStorage.getItem('refreshToken');
  const isUserPage = location.pathname.split('/')[1] === 'u';
  function Logout() {
    clearToken();
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className={headerContainer}>
      <div className={iconContainer} style={{ justifyContent: 'flex-start' }}>
        {!isUserPage && (
          <button onClick={() => navigate(-1)} className={iconButton}>
            <MdOutlineArrowBackIos size={18} />
          </button>
        )}
      </div>
      <button onClick={() => navigate('/')} className={iconButton}>
        <img src={logo} alt="chosung letter logo" />
      </button>
      <div className={iconContainer} style={{ justifyContent: 'flex-end' }}>
        {isUserPage && (
          <>
            {isLoginUser && (
              <button onClick={() => Logout()} className={iconButton}>
                <MdLogout size={20} />
              </button>
            )}
            <button
              onClick={() =>
                navigate(`/u/${localStorage.getItem('memberToken')}`)
              }
              className={iconButton}
            >
              <MdPermIdentity size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
