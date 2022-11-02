import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Link to="/cvf1tc0">
        <button>User 페이지</button>
      </Link>
      <Link to="/create/1">
        <button>User 1에게 메세지 보내기</button>
      </Link>
      <Link to="/read/1">
        <button>메세지 확인하기</button>
      </Link>
    </div>
  );
}

export default Home;
