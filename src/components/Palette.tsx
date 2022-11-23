import { css } from '@emotion/css';
import { createMessageParams } from '../api/message/types';
import Theme from '../assets/Theme';
import { MdCheck } from 'react-icons/md';
import palette1 from '../assets/palette1.png';
import palette2 from '../assets/palette2.png';

const container = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 15px;
`;

function Circle({
  color,
  selected,
  index,
}: {
  color: string;
  selected: boolean;
  index: number;
}) {
  const circle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Theme.color.black};
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: ${color};
    box-shadow: ${selected
      ? `0 0 0 2px ${Theme.color.black} inset`
      : undefined};
  `;

  const pattern1 = css`
    background-image: url(${palette1});
    background-size: cover;
  `;
  const pattern2 = css`
    background-image: url(${palette2});
    background-size: cover;
  `;
  return (
    <div
      className={`${circle} ${index === 0 && pattern1} ${
        index === 1 && pattern2
      }`}
    >
      {selected && <MdCheck size={23} />}
    </div>
  );
}

interface Props {
  form: createMessageParams;
  setForm: React.Dispatch<React.SetStateAction<createMessageParams>>;
}

function Palette({ form, setForm }: Props) {
  const colors = [
    Theme.color.pattern1,
    Theme.color.pattern2,
    Theme.color.red,
    Theme.color.orange,
    Theme.color.yellow,
    // Theme.color.lightGreen,
    Theme.color.green,
    // Theme.color.lightBlue,
    Theme.color.blue,
    Theme.color.lightPurple,
    Theme.color.pink,
    Theme.color.purple,
  ];

  const box = css`
    display: flex;
    justify-content: center;
    width: calc(100% / 5);
    margin: 10px 0px;
    padding: 0px;
    background: none;
    border: none;
  `;

  return (
    <div className={container}>
      {colors.map((v, i) => (
        <button
          className={box}
          onClick={() => setForm({ ...form, color: i })}
          key={i}
        >
          <Circle color={v} selected={form.color === i} index={i} />
        </button>
      ))}
    </div>
  );
}

export default Palette;
