import { css } from '@emotion/css';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { createMessageParams } from '../api/message/types';
import { getUser } from '../api/user';
import { getUserResult } from '../api/user/type';
import Theme from '../assets/Theme';
import BottomButton from '../components/BottomButton';
import Tag from '../components/Tag';

const subtitle = css`
  display: flex;
  align-items: center;
  font-weight: ${Theme.fontWeight.semibold};
  gap: 5px;
`;

function Create() {
  const memberToken = useLocation().pathname.split('/')[2];
  const [name, setName] = useState<string>('');
  const [form, setForm] = useState<createMessageParams>({
    body: '',
    nickname: '',
    toMemberToken: '',
    color: 0,
  });
  useQuery('getUser', () => getUser(memberToken), {
    onSuccess: (data: getUserResult) => {
      setName(data.kakaoNickname);
    },
  });

  return (
    <>
      <div className={subtitle}>
        <Tag text="닉네임" />을 입력해주세요
      </div>
      <input placeholder="10자 이내로 작성해주세요 (영어, 한글만 사용가능)" />
      <div className={subtitle}>
        <Tag text="원하는 색" />을 선택해주세요
      </div>
      <div className={subtitle}>
        <Tag text="To." />
        {name}
      </div>
      <textarea
        onChange={e => {
          setForm({ ...form, body: e.target.value });
        }}
      />
      <textarea />
      <BottomButton enable={!!form.body} onClick={() => console.log(form)}>
        작성 완료
      </BottomButton>
    </>
  );
}

export default Create;
