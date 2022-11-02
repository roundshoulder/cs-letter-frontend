import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';

const check = '000000011111111110101000001100000001';

const solution =
  "나는 새삥 모든 게 다 새삥 보세 옷을 걸쳐도 브랜드 묻는 DM이 와 I'm too sexy 헌 집 주고 새집 프리미엄이 붙어 두 배, 세 배, 네 배 yeah 나는 새삥";
const problem =
  "ㄴㄴ ㅅㅃ ㅁㄷ ㄱ ㄷ ㅅㅃ ㅂㅅ ㅇㅇ ㄱㅊㄷ ㅂㄹㄷ ㅁㄴ DMㅇ ㅇ I'm too sexy ㅎ ㅈ ㅈㄱ ㅅㅈ ㅍㄹㅁㅇㅇ ㅂㅇ ㄷ ㅂ, ㅅ ㅂ, ㄴ ㅂ yeah ㄴㄴ ㅅㅃ";

const textStyle = css`
  line-height: 60px;
  font-size: 16px;
  font-weight: bold;
`;

const inputStyle = css`
  border: none;
  padding: 0px;
  background: none;
  :focus {
    outline: none;
  }
  display: block;
  position: absolute;
  top: 22px;
  width: 100%;
  color: #656565;
  font-weight: normal;
`;

const buttonStyle = css`
  margin-top: 200px;
  width: 100%;
  height: 40px;
`;

const red = css`
  color: red;
`;

const viewMode = css`
  background: none;
  border: none;
`;

function Read() {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState([0]);
  const [isEditable, setIsEditable] = useState(true);

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
    <div>
      {isEditable ? (
        <>
          <div className={textStyle}>{problem}</div>
          <textarea
            className={`${textStyle} ${inputStyle}`}
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
            className={textStyle}
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
            className={`${textStyle} ${inputStyle}`}
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
      <button
        className={buttonStyle}
        onClick={checkAnswer}
        disabled={answer.length !== problem.length}
      >
        확인하기
      </button>
    </div>
  );
}

export default Read;
