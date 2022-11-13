import React, { useState } from 'react';
import { css } from '@emotion/css';
import { useQuery } from 'react-query';
import { getDetailMessage } from '../api/message';
import { useLocation } from 'react-router-dom';
import { DetailMessage } from '../api/message/types';
import Tag from '../components/Tag';
import Theme from '../assets/Theme';
import BottomButton from '../components/BottomButton';

const solution =
  "나는 새삥 모든 게 다 새삥 보세 옷을 걸쳐도 브랜드 묻는 DM이 와 I'm too sexy 헌 집 주고 새집 프리미엄이 붙어 두 배, 세 배, 네 배 yeah 나는 새삥";
const problem =
  "ㄴㄴ ㅅㅃ ㅁㄷ ㄱ ㄷ ㅅㅃ ㅂㅅ ㅇㅇ ㄱㅊㄷ ㅂㄹㄷ ㅁㄴ DMㅇ ㅇ I'm too sexy ㅎ ㅈ ㅈㄱ ㅅㅈ ㅍㄹㅁㅇㅇ ㅂㅇ ㄷ ㅂ, ㅅ ㅂ, ㄴ ㅂ yeah ㄴㄴ ㅅㅃ";

const textArea = css`
  background: none;
  font-size: 16px;
`;

const problemStyle = css`
  /* line-height: 60px;
  font-size: 16px;
  font-weight: bold; */
`;

const solutionStyle = css`
  /* border: solid 1.5px ${Theme.color.grey};
  border-radius: 15px;
  background: none;
  :focus {
    outline: none;
  }
  display: block;
  position: absolute; */
`;

const red = css`
  color: red;
`;

const viewMode = css`
  background: none;
  border: none;
`;

function Read() {
  const messageId = useLocation().pathname.split('/')[2];
  console.log(messageId);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState([0]);
  const [isEditable, setIsEditable] = useState(true);

  useQuery('getDetailMessage', () => getDetailMessage(messageId), {
    onSuccess: (data: DetailMessage) => {},
  });

  function checkAnswer() {
    console.log(result);
    let res = [];
    for (let i = 0; i < problem.length; i++) {
      if (answer[i] === solution[i]) {
        res.push(1);
      } else {
        res.push(0);
      }
    }
    setResult(res);
    setIsEditable(false);
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <Tag text="From." />
        <Tag text="채소피자" color={0} />
      </div>
      {isEditable ? (
        <>
          <textarea className={`${textArea} ${problemStyle}`} disabled={true}>
            {problem}
          </textarea>
          <textarea
            className={`${textArea} ${solutionStyle}`}
            spellCheck={false}
            maxLength={problem.length}
            value={answer}
            rows={5}
            onChange={e => setAnswer(e.target.value)}
          />
        </>
      ) : (
        <button onClick={() => setIsEditable(true)} className={viewMode}>
          <div
            style={{ display: 'flex', flexWrap: 'wrap' }}
            className={`${textArea} ${problemStyle}`}
          >
            {result.map((v, i) =>
              problem[i] === ' ' ? (
                <div>&nbsp;</div>
              ) : v ? (
                <span>{problem[i]}</span>
              ) : (
                <span className={red}>{problem[i]}</span>
              )
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              position: 'absolute',
              top: '22px',
            }}
            className={`${textArea} ${solutionStyle}`}
          >
            {result.map((v, i) =>
              answer[i] === ' ' ? (
                <div>&nbsp;</div>
              ) : v ? (
                <span>{answer[i]}</span>
              ) : (
                <span className={red}>{answer[i]}</span>
              )
            )}
          </div>
        </button>
      )}
      <BottomButton enable={!!answer.length} onClick={() => {}}>
        확인하기
      </BottomButton>
    </>
  );
}

export default Read;
