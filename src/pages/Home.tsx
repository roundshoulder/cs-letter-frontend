import { css } from '@emotion/css';
import Theme, { PADDING } from '../assets/Theme';
import KakaoButton from '../components/KakaoButton';
import Tag from '../components/Tag';
import { MdMailOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import down from '../assets/down.svg';

const intro = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: ${Theme.color.white};
  padding: 26px 0px;
`;

const rule = css`
  display: flex;
  color: ${Theme.color.white};
  font-weight: ${Theme.fontWeight.regular};
  font-size: 13px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  padding: 0px ${PADDING}px;
  margin-bottom: 100px;
`;

const frame = css`
  width: 100%;
  margin-top: 220px;
  overflow: hidden;
`;

const container = css`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const mypage = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 47px;
  border-radius: 47px;
  border: none;
  color: ${Theme.color.black};
  font-weight: ${Theme.fontWeight.bold};
`;

function Home() {
  const memberToken = localStorage.getItem('memberToken');
  const navigate = useNavigate();
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
        {memberToken ? '초성편지를 확인하세요!' : '초성편지를 보내보세요!'}
      </div>
      <div style={{ padding: `0px ${PADDING}px` }}>
        {memberToken ? (
          <button
            className={mypage}
            onClick={() => navigate(`/u/${memberToken}`)}
          >
            내 편지함 가기
          </button>
        ) : (
          <KakaoButton />
        )}
      </div>
      <div className={intro}>초성 편지가 궁금하다면?</div>
      <div className={rule}>
        <img
          src={down}
          alt={'scroll down'}
          style={{ alignSelf: 'center', marginBottom: '100px' }}
        />
        <Tag text="친구에게 편지를 작성해보세요!" color={6} />
        <span>ㆍ 편지를 작성하면 초성으로 변환되어 전달돼요.</span>
        <span>
          ㆍ 한 번 작성한 편지는 수정이 불가하니 신중하게 작성해 주세요.
        </span>
        <Tag text="초성편지를 받고 싶다면?" color={4} />
        <span>ㆍ SNS를 통해 내 편지함의 링크를 공유해 보아요.</span>
        <Tag text="친구들이 작성한 편지를 맞춰보세요!" color={8} />
        <span>ㆍ 하루 5번의 기회가 주어지고 자정이 지나면 초기화돼요.</span>
      </div>
    </>
  );
}

export default Home;
