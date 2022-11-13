import { css } from '@emotion/css';
import { createMessageParams } from '../api/message/types';
import Theme from '../assets/Theme';
import { MdCheck } from 'react-icons/md';

const container = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 15px;
`;

function Circle({ color, selected }: { color: string; selected: boolean }) {
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
  return <div className={circle}>{selected && <MdCheck size={23} />}</div>;
}

interface Props {
  form: createMessageParams;
  setForm: React.Dispatch<React.SetStateAction<createMessageParams>>;
}

function Palette({ form, setForm }: Props) {
  const colors = [
    Theme.color.red,
    Theme.color.orange,
    Theme.color.yellow,
    Theme.color.lightGreen,
    Theme.color.green,
    Theme.color.lightBlue,
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
        <button className={box} onClick={() => setForm({ ...form, color: i })}>
          <Circle color={v} selected={form.color === i} />
        </button>
      ))}
    </div>
  );
}

export default Palette;
