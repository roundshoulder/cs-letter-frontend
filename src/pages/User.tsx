import { css } from '@emotion/css';
import { Link, useLocation } from 'react-router-dom';
import Theme from '../assets/Theme';
import MessageListRenderItem from '../components/MessageListRenderItem';
import Tag from '../components/Tag';
import {
  MdOutlineCreate,
  MdDownloadDone,
  MdVerified,
  MdMailOutline,
  MdNotificationsNone,
  MdOutlineEast,
  MdPersonOutline,
} from 'react-icons/md';
import { useState } from 'react';
import BottomButton from '../components/BottomButton';
import KakaoButton from '../components/KakaoButton';
import { useQuery } from 'react-query';
import { getUser } from '../api/user';
import { getUserResult } from '../api/user/type';
import { getMessage } from '../api/message';
import { Message } from '../api/message/types';
import PageNavButton from '../components/PageNavButton';
import CopyToClipboard from 'react-copy-to-clipboard';

const notice = css`
  display: flex;
  padding: 0px 18px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  border: solid 1px ${Theme.color.grey};
  font-size: 11px;
  height: 25px;
  border-radius: 25px;
`;
const noticeContents = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

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
  align-items: center;
  font-size: 18px;
  font-weight: ${Theme.fontWeight.bold};
  padding: 15px 0px 15px 0px;
`;

const arrowButtonContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13px;
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

const profileImgContainer = css`
  width: 35px;
  height: 35px;
  border-radius: 36px;
  position: relative;
  overflow: hidden;
`;
const profileImg = css`
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  box-shadow: 0 0 0 2px ${Theme.color.black} inset;
`;

const intro = css`
  font-weight: ${Theme.fontWeight.semibold};
  text-align: center;
  margin: 55px 0px 15px 0px;
`;

const staticContainer = css`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  padding-bottom: 10px;
  border-bottom: solid 1px #0a0a0a;
`;

const staticItem = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

function User() {
  const memberToken = useLocation().pathname.split('/')[2];
  const [user, setUser] = useState<getUserResult | null>(null);
  const [page, setPage] = useState<number>(0);
  const [cursor, setCursor] = useState<number>(0);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [copy, setCopy] = useState<boolean>(false);
  const url = window.location.href;

  useQuery(['getUser', memberToken], () => getUser(memberToken), {
    onSuccess: (data: getUserResult) => {
      setUser(data);
    },
  });

  const { isLoading } = useQuery(
    ['getMessage', memberToken, cursor],
    () =>
      getMessage({
        memberToken: memberToken,
        cursor: cursor,
      }),
    {
      onSuccess: data => {
        setMessages(data);
      },
    }
  );
  return (
    <>
      {user && messages && (
        <>
          <a
            href="https://chosung-letter.notion.site/1dcc2f838fab47eeb47c97787077ab9f"
            className={notice}
          >
            <div className={noticeContents}>
              <MdNotificationsNone size={16} />
              <span style={{ fontWeight: Theme.fontWeight.bold }}>공지</span>
              <span>{'프로필 수정 기능이 추가되었어요!🙂'}</span>
            </div>
            <MdOutlineEast size={16} />
          </a>
          <div className={profile}>
            <Tag text="To." />
            <div className={profileImgContainer}>
              <div className={profileImg} />
              <img
                src={user.kakaoProfileImg}
                alt="profile"
                style={{ width: '100%', height: `100%`, objectFit: 'cover' }}
              />
            </div>
            {user.kakaoNickname}
            {user.isMe ? (
              <Link
                to={`/edit/${memberToken}`}
                className={`${createButton} ${Theme.tagStyle[11]}`}
              >
                <MdPersonOutline />
                프로필 수정
              </Link>
            ) : (
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Tag text="From." />
              <MdMailOutline
                size={20}
                style={{ marginLeft: '14px', marginRight: '8px' }}
              />
              {user.countMessage}
            </div>
            <div className={arrowButtonContainer}>
              <PageNavButton
                direction="back"
                enable={
                  (messages[0]?.prevCursor === 0 ||
                    !!messages[0]?.prevCursor) &&
                  !isLoading
                }
                onClick={() => {
                  setCursor(messages[0]?.prevCursor);
                  setPage(v => v - 1);
                }}
              />
              {page + 1}
              <PageNavButton
                direction="foward"
                enable={!!messages[0]?.nextCursor && !isLoading}
                onClick={() => {
                  setCursor(messages[0]?.nextCursor);
                  setPage(v => v + 1);
                }}
              />
            </div>
          </div>
          <div className={staticContainer}>
            <div className={staticItem}>
              읽지 않음
              <span style={{ fontWeight: Theme.fontWeight.bold }}>
                {user.notRead}
              </span>
              <MdVerified size={18} color={Theme.color.grey} />
            </div>
            <div className={staticItem}>
              푸는 중
              <span style={{ fontWeight: Theme.fontWeight.bold }}>
                {user.solving}
              </span>
              <MdVerified size={18} color={Theme.color.error} />
            </div>
            <div className={staticItem}>
              완성
              <span style={{ fontWeight: Theme.fontWeight.bold }}>
                {user.correctMessage}
              </span>
              <MdVerified size={18} color={Theme.color.black} />
            </div>
          </div>
          {messages.map(message => (
            <MessageListRenderItem
              message={message}
              isMe={user.isMe}
              key={message.messageId}
            />
          ))}
          {user.isMe ? (
            <>
              <div className={intro}>{`누르기만 해도 링크복사 :-)`}</div>
              <CopyToClipboard
                text={url}
                onCopy={() => {
                  setCopy(true);
                  setTimeout(() => setCopy(false), 3000);
                }}
              >
                <BottomButton isShare={true}>
                  공유하고 초성편지받기
                </BottomButton>
              </CopyToClipboard>
              <div style={{ height: '30px', marginTop: '13px' }}>
                {copy && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      fontSize: '11px',
                      fontWeight: Theme.fontWeight.bold,
                    }}
                  >
                    <MdDownloadDone size={16} />
                    링크가 복사되었습니다
                  </div>
                )}
              </div>
            </>
          ) : (
            !localStorage.getItem('refreshToken') && (
              <>
                <div className={intro}>초성편지 나도 받고 싶다면,</div>
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
