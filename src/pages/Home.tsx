import { css } from '@emotion/css';
import Theme, { PADDING } from '../assets/Theme';
import KakaoButton from '../components/KakaoButton';
import Tag from '../components/Tag';
import { MdMailOutline } from 'react-icons/md';

const intro = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: ${Theme.color.white};
  padding: 26px 0px;
`;

const frame = css`
  width: 100%;
  overflow: hidden;
`;

const container = css`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

function Home() {
  const animation1 = css`
    animation-name: slide;
    animation-duration: 30s;
    @keyframes slide {
      from {
        margin-left: 0px;
      }
      to {
        margin-left: -1120px;
      }
    }
  `;
  const animation2 = css`
    animation-name: slide1;
    animation-duration: 25s;
    @keyframes slide1 {
      from {
        margin-left: -1120px;
      }
      to {
        margin-left: 0px;
      }
    }
  `;
  const animation3 = css`
    animation-name: slide2;
    animation-duration: 20s;
    @keyframes slide2 {
      from {
        margin-left: 0px;
      }
      to {
        margin-left: -1120px;
      }
    }
  `;
  return (
    <>
      <div className={frame}>
        <div className={`${container} ${animation1}`}>
          <Tag text="ㅊㅅㅍㅈ" color={9} type={'mobileHome'} />
          <Tag text="!" color={6} type={'mobileHome'} isSquare={true} />
          <Tag text="From." color={0} type={'mobileHome'} />
          <Tag text="?" color={4} type={'mobileHome'} isSquare={true} />
          <Tag text="Secret" color={2} type={'mobileHome'} />
          <Tag text="Message" color={5} type={'mobileHome'} />
          <Tag text="ㅊㅅㅍㅈ" color={1} type={'mobileHome'} />
          <Tag text="To." color={11} type={'mobileHome'} />
          <Tag text="!" color={7} type={'mobileHome'} isSquare={true} />
          <Tag text="ㅊㅅㅍㅈ" color={9} type={'mobileHome'} />
          <Tag text="!" color={6} type={'mobileHome'} isSquare={true} />
          <Tag text="From." color={0} type={'mobileHome'} />
          <Tag text="?" color={4} type={'mobileHome'} isSquare={true} />
        </div>
        <div className={`${container} ${animation2}`}>
          <Tag text="To." color={11} type={'mobileHome'} />
          <Tag text="!" color={7} type={'mobileHome'} isSquare={true} />
          <Tag text="ㅊㅅㅍㅈ" color={9} type={'mobileHome'} />
          <Tag text="!" color={6} type={'mobileHome'} isSquare={true} />
          <Tag text="From." color={0} type={'mobileHome'} />
          <Tag text="?" color={4} type={'mobileHome'} isSquare={true} />
          <Tag text="Secret" color={2} type={'mobileHome'} />
          <Tag text="Message" color={5} type={'mobileHome'} />
          <Tag text="ㅊㅅㅍㅈ" color={1} type={'mobileHome'} />
          <Tag text="To." color={11} type={'mobileHome'} />
          <Tag text="!" color={7} type={'mobileHome'} isSquare={true} />
          <Tag text="ㅊㅅㅍㅈ" color={9} type={'mobileHome'} />
          <Tag text="!" color={6} type={'mobileHome'} isSquare={true} />
        </div>
        <div className={`${container} ${animation3}`}>
          <Tag text="?" color={4} type={'mobileHome'} isSquare={true} />
          <Tag text="Secret" color={2} type={'mobileHome'} />
          <Tag text="Message" color={5} type={'mobileHome'} />
          <Tag text="ㅊㅅㅍㅈ" color={1} type={'mobileHome'} />
          <Tag text="To." color={11} type={'mobileHome'} />
          <Tag text="!" color={7} type={'mobileHome'} isSquare={true} />
          <Tag text="ㅊㅅㅍㅈ" color={9} type={'mobileHome'} />
          <Tag text="!" color={6} type={'mobileHome'} isSquare={true} />
          <Tag text="From." color={0} type={'mobileHome'} />
          <Tag text="?" color={4} type={'mobileHome'} isSquare={true} />
          <Tag text="Secret" color={2} type={'mobileHome'} />
          <Tag text="Message" color={5} type={'mobileHome'} />
          <Tag text="ㅊㅅㅍㅈ" color={1} type={'mobileHome'} />
        </div>
      </div>
      <div className={intro}>
        <MdMailOutline size={20} />
        초성편지를 보내보세요!
      </div>
      <div style={{ padding: `0px ${PADDING}px 0px ${PADDING}px` }}>
        <KakaoButton />
      </div>
    </>
  );
}

export default Home;
