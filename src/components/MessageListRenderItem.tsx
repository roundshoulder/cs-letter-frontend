import { css } from '@emotion/css';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Message } from '../api/message/types';
import { MdVerified } from 'react-icons/md';
import Tag from './Tag';
import Theme from '../assets/Theme';
const box = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-bottom: solid 1px #0a0a0a;
  padding: 15px 0px 15px 0px;
`;
const header = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const status = css`
  display: flex;
  font-size: 11px;
  flex-direction: row;
  align-items: flex-start;
  gap: 3px;
`;

interface Params {
  message: Message;
  isMe: boolean;
}

function MessageListRenderItem({ message, isMe }: Params) {
  const { body, color, messageId, nickname, time, isCorrect } = message;
  function Container({ children }: { children: ReactNode }) {
    return isMe ? (
      <Link to={`/read/${messageId}`}>{children}</Link>
    ) : (
      <div>{children}</div>
    );
  }
  const Month = parseInt(time.substring(5, 7), 10);
  const Day = parseInt(time.substring(8, 10), 10);
  const Hour = parseInt(time.substring(11, 13), 10);
  const Minute = parseInt(time.substring(14, 16), 10);
  const Second = parseInt(time.substring(17, 19), 10);
  const nowDay = new Date().getDate();
  const nowHour = new Date().getHours();
  const nowMinute = new Date().getMinutes();
  const nowSecond = new Date().getSeconds();
  return (
    <Container>
      <div className={box}>
        <div className={header}>
          <Tag color={color} text={nickname} />
          <div className={status}>
            <div
              className={status}
              style={isCorrect ? undefined : { color: Theme.color.grey }}
            >
              <span>{isCorrect ? '완성' : '미완성'}</span>
              <MdVerified size={18} />
            </div>
            <div style={{ color: Theme.color.grey, marginLeft: '5px' }}>
              {nowDay - Day !== 0
                ? `${Month}월 ${Day}일`
                : nowHour - Hour !== 0
                ? `${Math.abs(nowHour - Hour)}시간 전`
                : nowMinute - Minute !== 0
                ? `${Math.abs(nowMinute - Minute)}분 전`
                : nowSecond - Second !== 0
                ? '방금 전'
                : ''}
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))',
              width: '100%',
              height: '100%',
            }}
          />
          <span>{`${body}...`}</span>
        </div>
      </div>
    </Container>
  );
}

export default MessageListRenderItem;
