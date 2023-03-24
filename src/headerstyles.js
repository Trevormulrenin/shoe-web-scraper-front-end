import { styled } from '@mui/material/styles';
import { List, ListItem, Divider, IconButton, Typography } from '@mui/material';

export const Root = styled('div')({
  flexGrow: 1,
});

export const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: '#ffffff',
}));

export const Logo = styled('img')({
  height: 50,
  marginRight: ({ theme }) => theme.spacing(2),
});

export const Title = styled(Typography)({
  flexGrow: 1,
  color: '#ffffff',
});

export const DrawerList = styled(List)({
  width: 250,
  paddingTop: 20,
  backgroundColor: 'gray',
  '& .MuiListItem-root': {
    justifyContent: 'flex-start',
    paddingTop: 0,
    paddingBottom: 0,
    borderTop: '1px solid white',
  },
  '& .MuiButton-root': {
    color: 'white',
    width: '100%',
    justifyContent: 'left',
  },
});

export const DrawerHeader = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 64,
  padding: '0 8px',
  backgroundColor: '#333333',
  color: '#ffffff',
});

export const DrawerListItem = styled(ListItem)({
  padding: 16,
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
});

export const DrawerDivider = styled(Divider)({
  marginTop: 16,
  marginBottom: 16,
});
