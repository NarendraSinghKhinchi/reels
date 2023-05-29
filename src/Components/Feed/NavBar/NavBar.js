import React, { useContext } from 'react'
import { AppBar,Toolbar,Typography,Button, Avatar } from '@mui/material' ;
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useNavigate} from 'react-router-dom' ;
import { AuthContext } from '../../Context/AuthContext';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';

import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

function NavBar({userData}) {
  const {logout} = useContext(AuthContext);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleProfile = ()=>{
    navigate(`/profile/${userData.userId}`)
  }
  const handleLogOut = async()=>{
        await logout();
        navigate(`/`);
   }
   const handleBannerClick = ()=>{
        navigate(`/feed`) ;
   }
   const handleExplore = ()=>{
        navigate(`/feed`);
   }
   const menuId = 'primary-search-account-menu';
   const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircleIcon /> <p>&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={handleLogOut}><ExitToAppIcon /><p>&nbsp;</p>Log out</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircleIcon /> <p>&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={handleLogOut}><ExitToAppIcon /><p>&nbsp;</p>Log out</MenuItem>
    </Menu>
  );
  return (
    <>
        <Box sx={{ flexGrow: 1 ,}}>
        <AppBar position="fixed" sx={{background:"white" }} >
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 ,color:"black"}}
            >
              <InstagramIcon />
            </IconButton>
            <Typography
                variant="body"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block',color:"black" } }}
            >
                Instagram
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' , color:"black", alignItems:"center", marginRight:"1rem" } }}>
                <HomeIcon onClick={handleBannerClick} sx={{marginRight:"1rem"}} />
                <ExploreIcon onClick={handleExplore} />
                <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                >
                <Avatar src={userData.profileUrl} sx={{height:"2rem" , width:"2rem"}} />
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                >
                <MoreIcon />
                </IconButton>
            </Box>
            </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        </Box>
    </>
  )
}

export default NavBar