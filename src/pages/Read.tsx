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
import ReadCounter from '../components/read/ReadCounter';
import Row from '../components/read/Row';

const check = css`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 24px;
`;

function Read() {
  const messageId = useLocation().pathname.split('/')[2];
  const [isEditable, setIsEditable] = useState(true);
  const [answer, setAnswer] = useState<string[]>([]);
  const [data, setData] = useState<getDetailMessageResult | null>(null);

  useQuery('getDetailMessage', () => getDetailMessage(messageId), {
    onSuccess: (data: getDetailMessageResult) => {
      setData(data);
      if (data.markingResult.body) {
        setAnswer(data.markingResult.body);
        setIsEditable(false);
      } else {
        setAnswer(Array(data.body.length).fill(''));
      }
    },
    refetchOnWindowFocus: false,
  });

  const { mutate, isLoading } = useMutation(marking, {
    onSuccess: (markingResult: markingResult) => {
      if (data) {
        setData({ ...data, markingResult: markingResult });
      }
      setIsEditable(false);
    },
  });

  const enable =
    answer.toString() !== data?.markingResult.body?.toString() &&
    answer.toString() !== '' &&
    data?.markingResult.count !== 5 &&
    !isLoading;

  const container = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    border: solid 1.5px
      ${data?.markingResult.isCorrect
        ? Theme.color.correct
        : !isEditable
        ? Theme.color.error
        : enable
        ? Theme.color.black
        : Theme.color.grey};
    border-radius: 15px;
    padding: 15px;
    padding-bottom: ${data?.markingResult.isCorrect ? '40px' : '15px'};
    margin: 10px 0px 100px 0px;
  `;

  return (
    <>
      {data && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
            }}
          >
            <Tag text="From." />
            <Tag text={data.nickname} color={data.color} />
          </div>
          <ReadCounter count={data.markingResult.count} color={data.color} />
          <div className={container}>
            {data.body.map((v, i) => (
              <Row
                key={i}
                isEditable={isEditable}
                problem={v}
                solution={answer[i]}
                result={
                  data.markingResult.result && data.markingResult.result[i]
                }
                onChange={e => {
                  const newAnswer = [...answer];
                  newAnswer[i] = e.target.value.slice(0, v.length);
                  setAnswer(newAnswer);
                }}
                setIsEditable={() => {
                  !data.markingResult.isCorrect && setIsEditable(true);
                }}
              />
            ))}
            {data.markingResult.isCorrect && (
              <MdCheck
                size={24}
                color={Theme.color.correct}
                className={check}
              />
            )}
          </div>
          <BottomButton
            enable={enable}
            isCorrect={data.markingResult.isCorrect && true}
            onClick={() => {
              mutate({ body: answer, messageId: data.messageId });
            }}
          >
            {data.markingResult.isCorrect
              ? `${data.markingResult.totalCount}회만에 맞췄어요!`
              : '정답 확인하기'}
          </BottomButton>
        </>
      )}
    </>
  );
}

export default Read;
