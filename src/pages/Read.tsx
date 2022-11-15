import { useState } from 'react';
import { css } from '@emotion/css';
import { useMutation, useQuery } from 'react-query';
import { getDetailMessage, marking } from '../api/message';
import { useLocation } from 'react-router-dom';
import { getDetailMessageResult, markingResult } from '../api/message/types';
import Tag from '../components/Tag';
import Theme from '../assets/Theme';
import BottomButton from '../components/BottomButton';
import { MdCheck } from 'react-icons/md';

const textArea = css`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  background: none;
  resize: none;
  border: none;
  font-size: 16px;
  min-height: 320px;
  line-height: 72px;
  padding: 0px;
  position: absolute;
  width: calc(100% - 30px);
  color: ${Theme.color.black};
  :focus {
    outline: none;
  }
  /* background-color: rgba(0, 0, 255, 0.2); */
`;

const problemStyle = css`
  font-weight: ${Theme.fontWeight.semibold};
  top: -15px;
`;

const solutionStyle = css`
  z-index: 5;
  top: 11px;
  color: ${Theme.color.darkgrey};
`;

const word = css`
  height: 72px;
  color: ${Theme.color.black};
`;

const red = css`
  color: red;
`;

const check = css`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 25px;
`;

function Read() {
  const messageId = useLocation().pathname.split('/')[2];
  const [isEditable, setIsEditable] = useState(true);
  const [answer, setAnswer] = useState('');
  const [markingResult, setMarkingResult] = useState<markingResult | null>(
    null
  );
  const [data, setData] = useState<getDetailMessageResult | null>(null);

  const textAreaConatainer = css`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    position: relative;
    border: solid 1.5px
      ${markingResult?.isCorrect ? Theme.color.black : Theme.color.grey};
    border-radius: 15px;
    padding: 15px;
    min-height: 320px;
    margin: 10px 0px 100px 0px;
    /* background-color: yellow; */
  `;

  function WordRenderItem({ v, i, w }: { v: boolean; i: number; w: string }) {
    return (
      <>
        {w === ' ' ? (
          <div key={i} className={`${word} ${!v && red}`}>
            &nbsp;
          </div>
        ) : (
          <div key={i} className={`${word} ${!v && red}`}>
            {w}
          </div>
        )}
      </>
    );
  }

  useQuery('getDetailMessage', () => getDetailMessage(messageId), {
    onSuccess: (data: getDetailMessageResult) => {
      setData(data);
      if (data.markingResult.body) {
        setAnswer(data.markingResult.body);
      }
      if (data.markingResult) {
        setMarkingResult(data.markingResult);
        setIsEditable(!data.markingResult.body);
      }
    },
  });

  const { mutate } = useMutation(marking, {
    onSuccess: (data: markingResult) => {
      if (data) {
        setMarkingResult(data);
      }
    },
  });
  return (
    <>
      {data && markingResult && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              marginBottom: '30px',
            }}
          >
            <Tag text="From." />
            <Tag text={data.nickname} color={data.color} />
          </div>
          <div
            style={{
              textAlign: 'end',
              paddingRight: '14px',
              fontSize: '11px',
              fontWeight: Theme.fontWeight.semibold,
            }}
          >
            남은 횟수 <span className={red}>{5 - markingResult.count}</span>
            /5
          </div>
          {isEditable ? (
            <div className={textAreaConatainer}>
              {markingResult.result ? (
                <div className={`${textArea} ${problemStyle} areafont`}>
                  {markingResult.result.map((v, i) => (
                    <WordRenderItem v={v} i={i} w={data.body[i]} />
                  ))}
                </div>
              ) : (
                <textarea
                  className={`${textArea} ${problemStyle} areafont`}
                  disabled={true}
                  value={data?.body}
                />
              )}
              <textarea
                className={`${textArea} ${solutionStyle} areafont`}
                spellCheck={false}
                value={answer}
                maxLength={data.body.length}
                onChange={e => setAnswer(e.target.value)}
              />
              {markingResult?.isCorrect && <MdCheck className={check} />}
            </div>
          ) : (
            <button
              className={`${textAreaConatainer} areafont`}
              onClick={() => setIsEditable(true)}
              style={{ background: 'none' }}
            >
              <div className={`${textArea} ${problemStyle}`}>
                {markingResult?.result &&
                  markingResult.result.map((v, i) => (
                    <WordRenderItem v={v} i={i} w={data.body[i]} />
                  ))}
              </div>
              <div className={`${textArea} ${solutionStyle}`}>
                {markingResult?.result &&
                  markingResult.result.map((v, i) => (
                    <WordRenderItem v={v} i={i} w={answer[i]} />
                  ))}
              </div>
              {markingResult?.isCorrect && <MdCheck className={check} />}
            </button>
          )}
          <BottomButton
            enable={
              (answer !== data.markingResult.body && answer !== '') ||
              markingResult?.isCorrect
            }
            isCorrect={markingResult?.isCorrect && true}
            onClick={() => {
              mutate({ body: answer, messageId: data.messageId });
              setIsEditable(false);
            }}
          >
            {markingResult?.isCorrect
              ? `${markingResult.totalCount}회만에 맞췄어요!`
              : '확인하기'}
          </BottomButton>
        </>
      )}
    </>
  );
}

export default Read;
