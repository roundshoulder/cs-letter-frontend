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

  function calcTime(time: string) {
    const start = new Date(time);
    const end = new Date();
    const diff = end.valueOf() - start.valueOf();
    if (diff < 1000 * 60) {
      return '방금 전';
    } else if (diff < 1000 * 60 * 60) {
      return `${Math.floor(diff / (1000 * 60))}분 전`;
    } else if (diff < 24 * 1000 * 60 * 60) {
      return `${Math.floor(diff / (1000 * 60 * 60))}시간 전`;
    } else if (diff < 3 * 1000 * 60 * 60 * 24) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24))}일 전`;
    }
    return `${start.getFullYear().toString().slice(2)}년 ${
      start.getMonth() + 1
    }월 ${start.getDate()}일`;
  }

  return (
    <Container>
      <div className={box}>
        <div className={header}>
          <Tag color={color} text={nickname} />
          <div className={status}>
            <div style={{ color: Theme.color.grey, marginLeft: '5px' }}>
              {calcTime(time)} |
            </div>
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
