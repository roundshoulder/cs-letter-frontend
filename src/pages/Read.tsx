import { useState } from 'react';
import { css } from '@emotion/css';
import { useMutation, useQuery } from 'react-query';
import { getDetailMessage, marking } from '../api/message';
import { useLocation } from 'react-router-dom';
import { getDetailMessageResult, markingResult } from '../api/message/types';
import Tag from '../components/Tag';
import Theme, { PADDING } from '../assets/Theme';
import BottomButton from '../components/BottomButton';
import { MdCheck } from 'react-icons/md';

const textArea = css`
  display: flex;
  flex-wrap: wrap;
  background: none;
  resize: none;
  border: none;
  font-size: 16px;
  min-height: 320px;
  line-height: 60px;
  padding: 0px;
  position: absolute;
  width: 100%;
  /* width: calc(100% - ${PADDING}px); */
  :focus {
    outline: none;
  }
`;

const problemStyle = css`
  font-weight: ${Theme.fontWeight.semibold};
  top: -15px;
`;

const solutionStyle = css`
  z-index: 5;
  top: 10px;
  color: ${Theme.color.darkgrey};
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
    min-width: 100%;
    max-width: 100%;
    position: relative;
    border: solid 1.5px
      ${markingResult?.isCorrect ? Theme.color.black : Theme.color.grey};
    border-radius: 15px;
    padding: 0px;
    min-height: 320px;
    margin: 10px 0px 100px 0px;
  `;

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
              fontSize: '11px',
              fontWeight: Theme.fontWeight.semibold,
            }}
          >
            남은 횟수{' '}
            <span className={red}>{5 - data.markingResult.count}</span>
            /5
          </div>
          {isEditable ? (
            <div className={textAreaConatainer}>
              {markingResult.result ? (
                <div className={`${textArea} ${problemStyle}`}>
                  {markingResult.result.map((v, i) =>
                    data.body[i] === ' ' ? (
                      <div key={i}>&nbsp;</div>
                    ) : v ? (
                      <span key={i}>{data.body[i]}</span>
                    ) : (
                      <span key={i} className={red}>
                        {data.body[i]}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <textarea
                  className={`${textArea} ${problemStyle}`}
                  disabled={true}
                  value={data?.body}
                />
              )}
              <textarea
                className={`${textArea} ${solutionStyle}`}
                spellCheck={false}
                value={answer}
                maxLength={data.body.length}
                onChange={e => setAnswer(e.target.value)}
              />
              {markingResult?.isCorrect && <MdCheck className={check} />}
            </div>
          ) : (
            <button
              className={textAreaConatainer}
              onClick={() => setIsEditable(true)}
              style={{ background: 'none' }}
            >
              <div className={`${textArea} ${problemStyle}`}>
                {markingResult?.result &&
                  markingResult.result.map((v, i) =>
                    data.body[i] === ' ' ? (
                      <div key={i}>&nbsp;</div>
                    ) : v ? (
                      <span key={i}>{data.body[i]}</span>
                    ) : (
                      <span key={i} className={red}>
                        {data.body[i]}
                      </span>
                    )
                  )}
              </div>
              <div className={`${textArea} ${solutionStyle}`}>
                {markingResult?.result &&
                  markingResult.result.map((v, i) =>
                    data.body[i] === ' ' ? (
                      <div key={i}>&nbsp;</div>
                    ) : v ? (
                      <span key={i}>{answer[i]}</span>
                    ) : (
                      <span key={i} className={red}>
                        {answer[i]}
                      </span>
                    )
                  )}
              </div>
              {markingResult?.isCorrect && <MdCheck className={check} />}
            </button>
          )}
          <BottomButton
            enable={
              (answer !== data.markingResult.body && answer !== '') ||
              markingResult?.isCorrect
            }
            onClick={() => {
              mutate({ body: answer, messageId: data.messageId });
              setIsEditable(false);
            }}
          >
            {markingResult?.isCorrect
              ? `${data.markingResult.totalCount}회만에 맞췄어요!`
              : '확인하기'}
          </BottomButton>
        </>
      )}
    </>
  );
}

export default Read;
