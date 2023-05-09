import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Login from './Login';
import NewLowest from './NewLowest';
import SavedShoe from './SavedShoe';
import ComparePrice from './ComparePrice';
import Search from './Search'
import MostPopular from './MostPopular'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import logo from '../logo/shoelogo.png';
import '../styles.css';

const Root = styled('div')({
  flexGrow: 1,
});

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: '#ffffff',
}));

const Logo = styled('img')({
  height: 50,
  marginRight: ({ theme }) => theme.spacing(2),
  display: 'inline-block',
});

const Title = styled(Typography)({
  color: '#ffffff',
  display: 'inline-block',
  marginLeft: '5px', // Add marginLeft to create spacing between logo and title
});

const LoginButton = styled(Button)({
  color: '#ffffff',
  textTransform: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
});

const TitleButton = styled(Button)({
  color: '#ffffff',
  textTransform: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
});

const DrawerList = styled(List)({
  width: 250,
  paddingTop: 20,
  backgroundColor: 'gray', // Change background color to gray
  '& .MuiListItem-root': {
    justifyContent: 'flex-start',
    paddingTop: 0,
    paddingBottom: 0,
    borderTop: '1px solid white', // Add line above each button
  },
  '& .MuiButton-root': {
    color: 'white',
    width: '100%', // Set button width to 100%
    justifyContent: 'left', // Align button text to left
  },
});

const DrawerHeader = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 64,
  padding: '0 8px',
  backgroundColor: '#333333',
  color: '#ffffff',
});

const DrawerListItem = styled(ListItem)({
  padding: 16,
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  marginBottom: 8, // add marginBottom to create space between items
});

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const idleTimeout = 5 * 60 * 1000;

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const checkUserLoggedIn = useCallback(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(user !== null);
  }, []);

  const handleUserActivity = useCallback(() => {
    setLastActiveTime(Date.now());
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const idleIntervalId = setInterval(() => {
      const timeElapsed = Date.now() - lastActiveTime;
      if (timeElapsed >= idleTimeout) {
        handleLogout();
      }
    }, 1000);

    const userActivityListener = window.addEventListener('mousemove', handleUserActivity);

    return () => {
      clearInterval(idleIntervalId);
      window.removeEventListener('mousemove', userActivityListener);
    };
  }, [isLoggedIn, lastActiveTime, handleLogout, handleUserActivity, idleTimeout]);

  const toggleDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

  const handleNewLowestClick = () => {
    navigate('/new-lowest');
  };

  const handleSavedShoeClick = () => {
    navigate('/saved-shoe');
  };

  const handleComparePriceClick = () => {
    navigate('/compare-price');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSearchByNameClick = () => {
    navigate('/search');
  };

  const handleMostPopularClick = () => {
    navigate('/most-popular');
  };

  const handleScheduler = () => {
    navigate('/notify-me');
  };

  const handleCreateUserClick = () => {
    navigate('/create-user');
  }

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleCloseComponent = () => {
    setActiveComponent(null);
  };

  const handleLoginFormSubmit = () => {
    localStorage.setItem('user', 'true');
    checkUserLoggedIn();
    setIsLoginOpen(false);
  };

  const renderCreateUserButton = () => {
    if (!isLoggedIn) {
      return (
        <LoginButton color="inherit" onClick={handleCreateUserClick}>Create User</LoginButton>
      );
    }
  };
  
  const renderLoginLogoutButtons = () => {
    if (isLoggedIn) {
      return (
        <div>
          <LoginButton color="inherit" onClick={handleLogout}>Logout</LoginButton>
          <Button color="inherit" onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>Home</Button>
        </div>
      );
    } else {
      return (
        <LoginButton color="inherit" onClick={handleLoginClick}>Login</LoginButton>
      );
    }
  };
  
  useEffect(() => {
    checkUserLoggedIn();
  }, [checkUserLoggedIn]);
  
  return (
    <Root>
      <AppBar position="static" style={{ backgroundColor: '#333333' }}>
        <Toolbar>
          <MenuButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </MenuButton>
          <Logo src={logo} alt="Logo" />
          <Title variant="h6">
            <TitleButton onClick={() => navigate('/')}>
              StockX Price Tracker
            </TitleButton>
          </Title>
          <Box sx={{ flexGrow: 1 }} />
          {renderCreateUserButton()}
          {renderLoginLogoutButtons()}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} sx={{ backgroundColor: '#d3d3d3' }}>
        <DrawerList>
          <DrawerHeader>
            <Typography variant="h6">StockX Price Tracker</Typography>
          </DrawerHeader>
          <DrawerListItem button onClick={handleNewLowestClick}>
            <Typography variant="subtitle1">New Lowest</Typography>
          </DrawerListItem>
          <DrawerListItem button onClick={handleSavedShoeClick}>
            <Typography variant="subtitle1">View Saved Shoes</Typography>
          </DrawerListItem>
          <DrawerListItem button onClick={handleComparePriceClick}>
            <Typography variant="subtitle1">Compare Price</Typography>
          </DrawerListItem>
          <DrawerListItem button onClick={handleSearchByNameClick}>
            <Typography variant="subtitle1">Search By Name</Typography>
          </DrawerListItem>
          <DrawerListItem button onClick={handleMostPopularClick}>
            <Typography variant="subtitle1">Most Popular</Typography>
          </DrawerListItem>
          <DrawerListItem button onClick={handleScheduler}>
            <Typography variant="subtitle1">Notify Me of Price Change</Typography>
          </DrawerListItem>
        </DrawerList>
      </Drawer>
      {isLoginOpen && (
        <Login onSubmit={handleLoginFormSubmit} onClose={handleLoginClose} />)}
      {activeComponent === 'NewLowest' && <NewLowest onClose={handleCloseComponent} />}
      {activeComponent === 'SavedShoe' && <SavedShoe onClose={handleCloseComponent} />}
      {activeComponent === 'ComparePrice' && <ComparePrice onClose={handleCloseComponent} />}
      {activeComponent === 'Search' && <Search onClose={handleCloseComponent} />}
      {activeComponent === 'MostPopular' && <MostPopular onClose={handleCloseComponent} />}
      {isHomePage && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography variant="h2" align="center" sx={{ fontFamily: 'Open Sans', fontSize: '50px' }}>
            Welcome to the StockX Price Tracker
          </Typography>
        </div>
      )}
    </Root>
  )
};