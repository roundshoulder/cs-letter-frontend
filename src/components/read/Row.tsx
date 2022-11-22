import { css } from '@emotion/css';
import Theme from '../../assets/Theme';

interface Params {
  isEditable: boolean;
  problem: string;
  solution: string;
  result: boolean[] | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  setIsEditable: React.MouseEventHandler<HTMLButtonElement>;
}

const container = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const row = css`
  display: flex;
  flex-direction: row;
`;
const button = css`
  background: none;
  border: none;
  padding: 0px;
  width: 100%;
`;

const input = css`
  border: none;
  padding: 0px;
  width: 100%;
  font-weight: ${Theme.fontWeight.regular};
`;

const word = css`
  color: ${Theme.color.black};
`;

const red = css`
  color: ${Theme.color.error};
`;

function WordRenderItem({ v, w }: { v: boolean; w: string }) {
  return (
    <>
      {w === ' ' ? (
        <div className={`${word} ${!v && red}`}>&nbsp;</div>
      ) : (
        <div className={`${word} ${!v && red}`}>{w}</div>
      )}
    </>
  );
}

function Row({
  isEditable,
  problem,
  solution,
  result,
  onChange,
  setIsEditable,
}: Params) {
  if (!result) {
    result = Array(problem.length).fill(true);
  }
  return (
    <div className={container}>
      <div className={row} style={{ fontWeight: Theme.fontWeight.semibold }}>
        {result.map((v, i) => (
          <WordRenderItem key={i} v={v} w={problem[i]} />
        ))}
      </div>
      {isEditable ? (
        <input
          maxLength={problem.length}
          placeholder="초성 메세지를 맞춰보세요"
          onChange={onChange}
          value={solution}
          className={input}
          spellCheck={false}
        />
      ) : (
        <button className={button} onClick={setIsEditable}>
          <div className={row} style={{ fontWeight: Theme.fontWeight.regular }}>
            {result.map((v, i) => (
              <WordRenderItem key={i} v={v} w={solution[i]} />
            ))}
          </div>
        </button>
      )}
    </div>
  );
}

export default Row;
