import { css } from '@emotion/css';
import Theme from '../../assets/Theme';
import { useState } from 'react';

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  height: 45px;
`;

const textContainer = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding-right: 12px;
  font-size: 13px;
  font-weight: ${Theme.fontWeight.semibold};
`;

const infoButton = css`
  position: relative;
  display: flex;
  width: 14px;
  height: 14px;
  background: none;
  justify-content: center;
  align-items: center;
  border: none;
`;

const infoButtonBackground = css`
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: ${Theme.color.black};
  border-radius: 14px;
`;

const infoButtonText = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  font-size: 9px;
  color: ${Theme.color.white};
`;

const bubble = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  height: 22px;
  width: 128px;
  font-size: 11px;
  background-color: ${Theme.color.black};
  color: ${Theme.color.white};
`;

const tail = css`
  position: absolute;
  bottom: -16px;
  margin-right: 12px;
  width: 0px;
  height: 0px;
  border-top: 10px solid ${Theme.color.black};
  border-bottom: 10px solid transparent;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-radius: 3px;
`;

function ReadCounter({ count }: { count: number }) {
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const bubbleContainer = css`
    position: relative;
    display: ${isInfoVisible ? 'flex' : 'none'};
    flex-direction: column;
    align-items: flex-end;
  `;
  const alert = () => {
    setIsInfoVisible(true);
    setTimeout(() => setIsInfoVisible(false), 3000);
  };

  return (
    <div className={container}>
      <div className={bubbleContainer}>
        <div className={bubble}>자정에 다시 늘어나요!</div>
        <div className={tail} />
      </div>
      <div className={textContainer}>
        <div>
          오늘 남은 횟수 <span style={{ color: 'red' }}>{5 - count}</span>/5
        </div>
        <button className={infoButton} onClick={alert}>
          <div className={infoButtonBackground} />
          <div className={infoButtonText}>?</div>
        </button>
      </div>
    </div>
  );
}

export default ReadCounter;
