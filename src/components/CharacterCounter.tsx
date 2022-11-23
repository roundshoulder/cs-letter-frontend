import { css } from '@emotion/css';
import Theme from '../assets/Theme';

const counter = css`
  font-weight: ${Theme.fontWeight.semibold};
  font-size: 11px;
  align-self: flex-end;
  color: ${Theme.color.grey};
`;

const dark = css`
  color: ${Theme.color.darkgrey};
`;
function CharacterCounter({ count }: { count: number }) {
  return (
    <div className={counter}>
      <span className={dark}>{count}</span> / 100
    </div>
  );
}

export default CharacterCounter;
