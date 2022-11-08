import { css } from '@emotion/css';
import Tag from './Tag';

const container = css`
  border-bottom: solid 1px #0a0a0a;
  padding: 15px 0px 15px 0px;
`;

const header = css`
  display: flex;
  flex-direction: row;
`;

function MessageListRenderItem() {
  return (
    <div className={container}>
      <div className={header}>
        <Tag color={4} text="채소피자" />
        <div>미완성</div>
        <div>1시간 전</div>
      </div>
      <span>ㄷㅎㅇ ㅇㄴ. ㅇㄴ ㄴㅇㄴㄷ ㅂ ㅅㅈㄷㄴㄲ</span>
    </div>
  );
}

export default MessageListRenderItem;
