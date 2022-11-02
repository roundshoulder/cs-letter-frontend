import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import Create from './pages/Create';
import Home from './pages/Home';
import Read from './pages/Read';
import User from './pages/User';

function App() {
  return (
    <MainContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:user" element={<User />} />
        <Route path="/create/:user" element={<Create />} />
        <Route path="/read/:no" element={<Read />} />
      </Routes>
    </MainContainer>
  );
}

export default App;
