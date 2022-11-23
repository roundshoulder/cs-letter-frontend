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
  gap: 7px;
  border-bottom: solid 1px #0a0a0a;
  padding: 15px 0px 15px 0px;
`;
const header = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const status = css`
  display: flex;
  font-size: 11px;
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

interface Params {
  message: Message;
  isMe: boolean;
}

function MessageListRenderItem({ message, isMe }: Params) {
  const { body, color, messageId, nickname, time, isCorrect, isRead } = message;
  function Container({ children }: { children: ReactNode }) {
    return isMe ? (
      <Link to={`/read/${messageId}`}>{children}</Link>
    ) : (
      <div>{children}</div>
    );
  }
  const [year, month, date, hour, minute, second] = time
    .split('/')
    .map(v => parseInt(v, 10));
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();
  const nowSecond = now.getSeconds();
  console.log(year, month, date, hour, minute, second);
  console.log(nowYear, nowMonth, nowDate, nowHour, nowMinute, nowSecond);
  return (
    <Container>
      <div className={box}>
        <div className={header}>
          <Tag color={color} text={nickname} />
          <div className={status}>
            <span>{isCorrect ? '완성' : isRead ? '푸는 중' : '읽지 않음'}</span>
            <MdVerified
              size={18}
              color={
                isCorrect
                  ? Theme.color.black
                  : isRead
                  ? Theme.color.error
                  : Theme.color.grey
              }
            />
            <div style={{ color: Theme.color.grey, marginLeft: '5px' }}></div>
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
          <span style={{ paddingLeft: '14px' }}>
            {body.length < 20 ? body : `${body}...`}
          </span>
        </div>
      </div>
    </Container>
  );
}

export default MessageListRenderItem;
