import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import Main from './components/Main/Main';
import { Box, useMediaQuery } from '@mui/material';
import Auth from './pages/Auth';
import DynamicPage from './pages/DynamicPage';
import ProtectedRoute from './utils/ProtectedRoute';
import NotFound from './pages/NotFound';
import Loading from './components/Loading/Loading';
import { usePromiseTracker } from "react-promise-tracker";
import { store } from './store/store';
import { createContext, useState } from 'react';
import DocsRole from './components/DocsRole/DocsRole';
import RoleMatrix from './pages/RoleMatrix';
import RecoverPassword from './pages/RecoverPassword';
export type ContextType = {
  hiddenScroll: boolean;
  setHiddenScroll: React.Dispatch<React.SetStateAction<boolean>>;
  isTablet: boolean;
};
export const Context = createContext<ContextType>({} as ContextType);

function App() {
  const isTablet =
    useMediaQuery(theme.breakpoints.down('vp_1024'));
  const { promiseInProgress } = usePromiseTracker({ delay: 0 });
  if (localStorage.getItem("token"))
    store.setToken(localStorage.getItem("token") as string);

  const [hiddenScroll, setHiddenScroll] = useState(false);
  return (<ThemeProvider theme={theme}>
    <Context.Provider value={{ hiddenScroll, setHiddenScroll, isTablet }}>
      {promiseInProgress && <Loading />}
      <Box sx={{
        display: promiseInProgress ? "none" : "flex", flexDirection: "column", height: "100vh", animation: promiseInProgress ? "fadeOut 0.6s ease-in-out" : "fadeIn 0.6s ease-in-out",
        transition: "opacity 0.3s ease-in-out",
        overflowY: hiddenScroll ? "hidden" : "auto",
      }}>
        <Header />
        <Main>
          <Routes>
            <Route path='/' element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/role/:roleId" element={<DocsRole />} />
              <Route path="/matrix-roles" element={<RoleMatrix />} />
              <Route path="/content/page/:pageCode" element={<DynamicPage />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
        <Footer />
      </Box>
    </Context.Provider>
  </ThemeProvider>
  );
}


export default App;
