import { css } from '@emotion/css';

const tagStyle: { [key: number]: string } = {
  0: css`
    background-color: #ff8c8c;
    color: #6b2929;
  `,
  1: css`
    background-color: #ffb864;
    color: #50381c;
  `,
  2: css`
    background-color: #ffe665;
    color: #534b23;
  `,
  3: css`
    background-color: #c6ff69;
    color: #384b1a;
  `,
  4: css`
    background-color: #4eda91;
    color: #1d3c2e;
  `,
  5: css`
    background-color: #abfff0;
    color: #244943;
  `,
  6: css`
    background-color: #65c6ff;
    color: #1c3b4d;
  `,
  7: css`
    background-color: #e1b1ff;
    color: #502a67;
  `,
  8: css`
    background-color: #ff95ee;
    color: #622b59;
  `,
  9: css`
    background-color: #996aff;
    color: #2e1a5b;
  `,
  10: css`
    background-color: #0a0a0a;
    color: #fafafa;
  `,
  11: css`
    background-color: #fafafa;
    color: #0a0a0a;
    box-shadow: 0 0 0 2px #0a0a0a inset;
  `,
};
const color: { [key: string]: string } = {
  red: '#ff8c8c',
  orange: '#ffb864',
  yellow: '#ffe665',
  lightGreen: '#c6ff69',
  green: '#4eda91',
  lightBlue: '#abfff0',
  blue: '#65c6ff',
  lightPurple: '#e1b1ff',
  pink: '#ff95ee',
  purple: '#996aff',
  black: '#0a0a0a',
  grey: '#bcbcbc',
  darkgrey: '#757575',
  white: '#fafafa',
  error: '#ff5959',
  correct: '#2cb1ff',
};

const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const Theme = { color, fontWeight, tagStyle };

export const PADDING = 23;

export default Theme;
