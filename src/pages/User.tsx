import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import Theme from '../assets/Theme';
import Button from '../components/Button';
import MessageListRenderItem from '../components/MessageListRenderItem';
import Tag from '../components/Tag';

const profile = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: ${Theme.fontWeight.semibold};
  margin-bottom: 30px;
`;
const nav = css`
  padding: 15px 0px 15px 0px;
  border-bottom: solid 1px #0a0a0a;
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
];

function User() {
  return (
    <>
      <div className={profile}>
        <Tag text="To." />
        최도원
      </div>
      <div className={nav}>
        <Tag text="From." />
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
      <Link to="/read/1">
        <button>메세지 확인하기</button>
      </Link>
      <div>{`누르기만 해도 링크복사 :-)`}</div>
      <Button>공유하고 초성편지받기</Button>
    </>
  );
}

export default User;
