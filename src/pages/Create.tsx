import { css } from '@emotion/css';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { createMessage } from '../api/message';
import { createMessageParams } from '../api/message/types';
import { getUserName } from '../api/user';
import Theme from '../assets/Theme';
import BottomButton from '../components/BottomButton';
import CharacterCounter from '../components/CharacterCounter';
import Palette from '../components/Palette';
import Tag from '../components/Tag';
import { ReplaceEmoji } from '../components/Validation';

const container = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const row = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const title = css`
  display: flex;
  align-items: center;
  font-weight: ${Theme.fontWeight.semibold};
  gap: 5px;
  margin-bottom: 5px;
  font-size: 16px;
`;
const subtitle = css`
  font-weight: ${Theme.fontWeight.semibold};
  font-size: 16px;
  padding-left: 12px;
`;
const nicknameInput = css`
  border: none;
  border-radius: 0px;
  border-bottom: solid 1px ${Theme.color.grey};
`;
const textAreaContainer = css`
  padding: 6px 15px 15px 15px;
  border: solid 2px ${Theme.color.black};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;
const textArea = css`
  min-height: 180px;
  border: none;
  padding: 0px;
  resize: none;
  line-height: 36px;
  background: none;
  ::-webkit-scrollbar {
    display: none;
  }
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
    color: 10,
  });

  useQuery('getUser', () => getUserName(memberToken), {
    onSuccess: (data: string) => {
      setName(data);
    },
  });

  const { mutate, isLoading } = useMutation(createMessage, {
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
        <div className={title}>
          <Tag text="닉네임" />을 입력해주세요
        </div>
        <input
          className={nicknameInput}
          placeholder="10자 이내로 작성해주세요"
          value={form.nickname}
          onChange={e => {
            setForm({ ...form, nickname: e.target.value.slice(0, 10) });
          }}
          maxLength={10}
          spellCheck={false}
        />
      </div>
      <div className={row}>
        <div className={title}>
          <Tag text="닉네임 색상" color={form.color} />을 선택해주세요
        </div>
        <Palette form={form} setForm={setForm} />
      </div>
      <div className={row}>
        <div className={title}>
          <Tag text="To." />
          {name}
        </div>
        <div className={subtitle}>
          {'메세지를 입력해주세요 (초성, 이모티콘 X)'}
        </div>
        <div className={textAreaContainer}>
          <textarea
            className={textArea}
            placeholder="ex. 안녕하세요 라운드숄더입니다"
            value={form.body}
            onChange={e => {
              const replacedText = ReplaceEmoji(e.target.value.slice(0, 100));
              setForm({ ...form, body: replacedText });
              toInitial(replacedText);
            }}
            maxLength={100}
            spellCheck={false}
          />
          <CharacterCounter count={form.body.length} />
        </div>
        <div className={subtitle} style={{ marginTop: '6px' }}>
          상대방에게는 이렇게 보여요
        </div>
        <div className={textAreaContainer}>
          <textarea
            className={textArea}
            disabled={true}
            placeholder="ex. ㅇㄴㅎㅅㅇ ㄹㅇㄷㅅㄷㅇㄴㄷ"
            value={initial}
          />
        </div>
      </div>
      <BottomButton
        enable={
          !!form.body && !!form.nickname && form.color !== 10 && !isLoading
        }
        onClick={() => mutate(form)}
      >
        작성 완료
      </BottomButton>
    </div>
  );
}

export default Create;
