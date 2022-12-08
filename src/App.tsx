import { Route, Routes, useNavigate } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import KakaoRedirectHandler from './pages/KakaoRedirectHandler';
import { QueryClient, QueryClientProvider } from 'react-query';
import Create from './pages/Create';
import Home from './pages/Home';
import Read from './pages/Read';
import User from './pages/User';
import useAuthLoadEffect from './hooks/useAuthLoadEffect';
import Alert from './pages/Alert';
import { setupInterceptor } from './api/client';
import EditProfile from './pages/EditProfile';

function App() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  useAuthLoadEffect();
  setupInterceptor(navigate);
  return (
    <QueryClientProvider client={queryClient}>
      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/u/:user" element={<User />} />
          <Route path="/edit/:user" element={<EditProfile />} />
          <Route path="/create/:user" element={<Create />} />
          <Route path="/read/:no" element={<Read />} />
          <Route path="/oauth/callback/*" element={<KakaoRedirectHandler />} />
          <Route path="/notfound" element={<Alert />} />
          <Route path="/nopermission" element={<Alert />} />
        </Routes>
      </MainContainer>
    </QueryClientProvider>
  );
}

export default App;
