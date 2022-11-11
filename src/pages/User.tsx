import { css } from '@emotion/css';
import { Link, useLocation } from 'react-router-dom';
import Theme from '../assets/Theme';
import MessageListRenderItem from '../components/MessageListRenderItem';
import Tag from '../components/Tag';
import {
  MdOutlineArrowBack,
  MdOutlineArrowForward,
  MdOutlineCreate,
} from 'react-icons/md';
import { useState } from 'react';
import BottomButton from '../components/BottomButton';
import KakaoButton from '../components/KakaoButton';
import { useQuery } from 'react-query';
import { getUser } from '../api/user';
import { getUserResult } from '../api/user/type';
import { getMessage } from '../api/message';

const profile = css`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: ${Theme.fontWeight.semibold};
  margin-bottom: 30px;
`;

const nav = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0px 15px 0px;
  border-bottom: solid 1px #0a0a0a;
`;

const arrowButtonContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  font-weight: ${Theme.fontWeight.bold};
  gap: 13px;
`;

const arrowButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  font-size: 24px;
  color: ${Theme.color.white};
  background-color: ${Theme.color.black};
`;

const createButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: fit-content;
  padding: 0px 10px 0px 10px;
  height: 35px;
  border-radius: 35px;
  font-weight: ${Theme.fontWeight.medium};
  position: absolute;
  right: 0;
`;

const profileImg = css`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  border: solid 2px ${Theme.color.black};
`;

const messages = [
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
];

function User() {
  const memberToken = useLocation().pathname.split('/')[2];
  const [user, setUser] = useState<getUserResult | null>(null);
  const [cursor, setCursor] = useState<number>(0);
  // const [messages, setMessages] = useState();

  useQuery('getUser', () => getUser(memberToken), {
    onSuccess: (data: getUserResult) => {
      setUser(data);
    },
  });

  useQuery('getMessage', () => getMessage({ memberToken, cursor }), {
    onSuccess: data => {
      console.log(data);
    },
  });
  return (
    <>
      {user && (
        <>
          <div className={profile}>
            <Tag text="To." />
            <img
              src={user.kakaoProfileImg}
              className={profileImg}
              alt="profile"
            />
            {user.kakaoNickname}
            {!user.isMe && (
              <Link
                to={`/create/${memberToken}`}
                className={`${createButton} ${Theme.tagStyle[11]}`}
              >
                <MdOutlineCreate />
                편지쓰기
              </Link>
            )}
          </div>
          <div className={nav}>
            <Tag text="From." />
            <div className={arrowButtonContainer}>
              <button
                className={arrowButton}
                onClick={() => setCursor(v => v - 1)}
              >
                <MdOutlineArrowBack />
              </button>
              {cursor + 1}
              <button
                className={arrowButton}
                onClick={() => setCursor(v => v + 1)}
              >
                <MdOutlineArrowForward />
              </button>
            </div>
          </div>
          {messages.map(() => (
            <MessageListRenderItem />
          ))}
          {user.isMe ? (
            <>
              <div>{`누르기만 해도 링크복사 :-)`}</div>
              <BottomButton isShare={true}>공유하고 초성편지받기</BottomButton>
            </>
          ) : (
            !localStorage.getItem('refreshToken') && (
              <>
                <div>초성편지 나도 받고 싶다면,</div>
                <KakaoButton />
              </>
            )
          )}
        </>
      )}
    </>
  );
}

export default User;
