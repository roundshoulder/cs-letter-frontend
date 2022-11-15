import { css } from '@emotion/css';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { createMessage } from '../api/message';
import { createMessageParams } from '../api/message/types';
import { getUser } from '../api/user';
import { getUserResult } from '../api/user/type';
import Theme from '../assets/Theme';
import BottomButton from '../components/BottomButton';
import Palette from '../components/Palette';
import Tag from '../components/Tag';

const container = css`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;
const row = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const subtitle = css`
  display: flex;
  align-items: center;
  font-weight: ${Theme.fontWeight.semibold};
  gap: 5px;
  margin-bottom: 5px;
`;
const nicknameInput = css`
  border: none;
  border-bottom: solid 1px ${Theme.color.grey};
`;
const bodyTextArea = css`
  border: solid 2px ${Theme.color.grey};
  border-radius: 15px;
  min-height: 80px;
  resize: none;
  background: none;
`;

const enableArea = css`
  border: solid 2px ${Theme.color.black};
`;

function Create() {
  const navigate = useNavigate();
  const memberToken = useLocation().pathname.split('/')[2];
  const [name, setName] = useState<string>('');
  const [initial, setInitial] = useState<string>('');
  const [form, setForm] = useState<createMessageParams>({
    body: '',
    nickname: '',
    toMemberToken: memberToken,
    color: 0,
  });

  useQuery('getUser', () => getUser(memberToken), {
    onSuccess: (data: getUserResult) => {
      setName(data.kakaoNickname);
    },
  });

  const { mutate } = useMutation(createMessage, {
    onSuccess: () => {
      navigate(`/u/${memberToken}`);
    },
  });

  function toInitial(body: string) {
    const result = body.split('');
    // prettier-ignore
    const chs = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    for (let i = 0; i < result.length; i++) {
      // 가-힣
      if (result[i] >= '\uAC00' && result[i] <= '\uD7A3') {
        let tmp = result[i].charCodeAt(0) - 0xac00;
        let c = Math.floor((tmp - (tmp % 28)) / 28 / 21);
        result[i] = chs[c];
      }
    }
    setInitial(result.join(''));
  }

  return (
    <div className={container}>
      <div className={row}>
        <div className={subtitle}>
          <Tag text="닉네임" />을 입력해주세요
        </div>
        <input
          className={nicknameInput}
          placeholder="10자 이내로 작성해주세요 (영어, 한글만 사용가능)"
          onChange={e => {
            setForm({ ...form, nickname: e.target.value });
          }}
          maxLength={10}
        />
      </div>
      <div className={row}>
        <div className={subtitle}>
          <Tag text="원하는 색" />을 선택해주세요
        </div>
        <Palette form={form} setForm={setForm} />
      </div>
      <div className={row}>
        <div className={subtitle}>
          <Tag text="To." />
          {name}
        </div>
        <textarea
          className={`${bodyTextArea} ${enableArea}`}
          placeholder="전하고 싶은 메세지를 입력해주세요."
          onChange={e => {
            setForm({ ...form, body: e.target.value });
            toInitial(e.target.value);
          }}
          maxLength={100}
        />
        <textarea
          className={bodyTextArea}
          disabled={true}
          placeholder="상대방에게는 이렇게 보여요!"
          value={initial}
        />
      </div>
      <BottomButton
        enable={
          !!form.body && !!form.nickname && (!!form.color || form.color === 0)
        }
        onClick={() => mutate(form)}
      >
        작성 완료
      </BottomButton>
    </div>
  );
}

export default Create;
