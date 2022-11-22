import { css } from '@emotion/css';
import { Link, useLocation } from 'react-router-dom';
import Theme from '../assets/Theme';
import MessageListRenderItem from '../components/MessageListRenderItem';
import Tag from '../components/Tag';
import { MdOutlineCreate, MdDownloadDone } from 'react-icons/md';
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

function User() {
  const memberToken = useLocation().pathname.split('/')[2];
  const [user, setUser] = useState<getUserResult | null>(null);
  const [cursor, setCursor] = useState<number>(0);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [copy, setCopy] = useState<boolean>(false);
  const url = window.location.href;

  useQuery(['getUser', memberToken], () => getUser(memberToken), {
    onSuccess: (data: getUserResult) => {
      setUser(data);
    },
  });

  useQuery(
    ['getMessage', cursor, memberToken],
    () =>
      getMessage(
        cursor !== 0 && !!messages
          ? {
              memberToken: memberToken,
              cursor: messages[messages.length - 1].messageId,
            }
          : { memberToken, cursor }
      ),
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
              <PageNavButton
                onClick={() => {
                  setCursor(v => v - 1);
                }}
                direction="back"
                enable={cursor !== 0}
              />
              {cursor + 1}
              <PageNavButton
                onClick={() => {
                  setCursor(v => v + 1);
                }}
                direction="foward"
                enable={!!messages[messages.length - 1]?.haveNextMessage}
              />
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
