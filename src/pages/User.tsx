import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
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

const profile = css`
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
  position: fixed;
  z-index: 100;
  right: 23px;
  bottom: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 70px;
  height: 70px;
  border-radius: 70px;
  font-size: 40px;
  color: ${Theme.color.white};
  background-color: ${Theme.color.black};
`;

const messages = [
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
  {
    name: '채소피자',
    preview: 'ㄷㅎㅇ ㅇㄴ ㅇㄴ ㄴㅇㄴㄷ',
    solved: false,
    time: 1,
  },
];

function User() {
  const [isOwner, setIsOwner] = useState(false);
  const [page, setPage] = useState(1);
  console.log(page);
  return (
    <>
      <div className={profile}>
        <Tag text="To." />
        최도원
      </div>
      <div className={nav}>
        <Tag text="From." />
        <div className={arrowButtonContainer}>
          <button className={arrowButton} onClick={() => setPage(v => v - 1)}>
            <MdOutlineArrowBack />
          </button>
          {page}
          <button className={arrowButton} onClick={() => setPage(v => v + 1)}>
            <MdOutlineArrowForward />
          </button>
        </div>
      </div>
      {messages.map(() => (
        <MessageListRenderItem />
      ))}
      <Link to="/cvf1tc0">
        <button>User 페이지</button>
      </Link>
      <Link to="/create/1">
        <button>User 1에게 메세지 보내기</button>
      </Link>
      {isOwner ? (
        <>
          <div>{`누르기만 해도 링크복사 :-)`}</div>
          <BottomButton isShare={true}>공유하고 초성편지받기</BottomButton>
        </>
      ) : (
        <>
          <div>초성편지 나도 받고 싶다면,</div>
          <KakaoButton />
          <button className={createButton}>
            <MdOutlineCreate />
          </button>
        </>
      )}
    </>
  );
}

export default User;
