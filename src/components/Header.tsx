import logo from '../assets/logo.svg';
import { css } from '@emotion/css';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import Theme, { PADDING } from '../assets/Theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearToken } from '../api/client';
import { KAKAO_AUTH_URL } from '../api/oauth';

const headerContainer = css`
  height: 60px;
  color: white;
  background-color: #0a0a0a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  padding: 0px ${PADDING}px;
`;

const buttonContainer = css`
  width: calc((100%-70px) / 2);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const button = css`
  border: none;
  background: none;
  color: ${Theme.color.white};
  font-size: 11px;
  padding: 0px;
`;

const logoButton = css`
  width: 70px;
  border: none;
  background: none;
  color: ${Theme.color.white};
  padding: 0px;
`;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginUser = !!localStorage.getItem('refreshToken');
  const pathName = location.pathname.split('/')[1];
  const isUserPage = pathName === 'u';
  const isAlertPage = pathName === 'nopermission' || pathName === 'notfound';
  function Logout() {
    clearToken();
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className={headerContainer}>
      <div className={buttonContainer} style={{ justifyContent: 'flex-start' }}>
        {!isUserPage && (
          <button
            onClick={isAlertPage ? () => navigate('/') : () => navigate(-1)}
            className={button}
          >
            <MdOutlineArrowBackIos size={18} />
          </button>
        )}
      </div>
      <button onClick={() => navigate('/')} className={logoButton}>
        <img src={logo} alt="chosung letter logo" width={70} />
      </button>
      <div className={buttonContainer} style={{ justifyContent: 'flex-end' }}>
        {isUserPage && (
          <>
            {isLoginUser ? (
              <>
                <button onClick={() => Logout()} className={button}>
                  로그아웃
                </button>
                |
                <button
                  className={button}
                  onClick={() => {
                    navigate(`/u/${localStorage.getItem('memberToken')}`);
                  }}
                >
                  내 편지함
                </button>
              </>
            ) : (
              <>
                <a href={KAKAO_AUTH_URL} className={button}>
                  로그인
                </a>
                |
                <a href={KAKAO_AUTH_URL} className={button}>
                  내 편지함
                </a>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
