import { createContext, useState } from 'react';
//Utils
import { ThemeWrapper } from './styles/ThemeWrapper';
import { useThemeMode } from './styles/ThemeWrapper/useThemeMode';
//Componentes
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar.jsx';
import Footer from 'components/Footer/';
import Notifier from 'views/Notifier';
import FloatingBack from './components/FloatingButtons/FloatingBack';
import FloatingTop from './components/FloatingButtons/FloatingTop';
//Rutas
import AppRoutes from 'routes';

export const SideBarContext = createContext({
  openSidebar: false,
  toggleSideBar: () => {},
});

function App(props) {
  //* vvvvvvvvvv THEME MANAGEMENT vvvvvvvvvv
  const [theme, toggleTheme] = useThemeMode();
  //* ^^^^^^^^^^^ THEME MANAGEMENT ^^^^^^^^^^^

  //* vvvvvvvvvv SIDEBAR MANAGEMENT vvvvvvvvvv
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSideBar = () => {
    setOpenSidebar(!openSidebar);
  };
  const sidebarCtx = { openSidebar, toggleSideBar };
  //* ^^^^^^^^^^^ SIDEBAR MANAGEMENT ^^^^^^^^^^^

  return (
    <ThemeWrapper theme={theme}>
      <div className="App">
        <Notifier />
        <SideBarContext.Provider value={sidebarCtx}>
          <div id="top-anchor"></div>
          <NavBar toggleTheme={toggleTheme} theme={theme} checked={theme} />
          <SideBar />
        </SideBarContext.Provider>
        <div Style="padding-top: 64px;min-height: 89vh;">
          <AppRoutes />
        </div>
        <hr></hr>
        <FloatingBack />
        <FloatingTop {...props} />
        <Footer />
      </div>
    </ThemeWrapper>
  );
}

export default App;
