import React from 'react';
import { KAKAO_AUTH_URL } from '../api/oauth';

function Home() {
  return (
    <div>
      <a href={KAKAO_AUTH_URL}>
        <button>카카오 로그인</button>
      </a>
    </div>
  );
}

export default Home;
