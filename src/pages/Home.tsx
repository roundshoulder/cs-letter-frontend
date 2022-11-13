import { css } from '@emotion/css';
import Theme from '../assets/Theme';
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

const container = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

function Home() {
  return (
    <>
      <div className={container}>
        <Tag text="ㅊㅅㅍㅈ" color={9} type={'mobileHome'} />
        <Tag text="!" color={5} type={'mobileHome'} isSquare={true} />
        <Tag text="From." color={8} type={'mobileHome'} />
        <Tag text="?" color={2} type={'mobileHome'} isSquare={true} />
        <Tag text="Secret" color={0} type={'mobileHome'} />
        <Tag text="Message" color={4} type={'mobileHome'} />
        <Tag text="ㅊㅅㅍㅈ" color={6} type={'mobileHome'} />
        <Tag text="To." color={11} type={'mobileHome'} />
        <Tag text="!" color={7} type={'mobileHome'} isSquare={true} />
      </div>
      <div className={intro}>
        <MdMailOutline size={20} />
        초성편지를 보내보세요!
      </div>
      <KakaoButton />
    </>
  );
}

export default Home;
