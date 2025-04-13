import { Avatar, Menu, MenuItem } from '@mui/material';
import './index.scss';
import ImageUserFallback from '../../assets/images/illustration-login.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '../../context/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [imgSrc, setImgSrc] = useState('');
  
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout()
    navigate('/login')
  };

  useEffect(()=> {
    setImgSrc(user?.image as string)
  }, [ user ])
  
  return (
    <div className="navbar">
      <div className="navbar-user" onClick={openMenu}>
        <Avatar
          src={imgSrc}
          alt="Foto"
          onError={() => setImgSrc(ImageUserFallback)}
        />

        <span className="navbar-text">{user?.nome} {user?.sobrenome}</span>
      </div>
      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              width: 180, 
              mt: 1,
            },
          }}
        >
          <MenuItem onClick={handleLogout}>
            <LogoutIcon fontSize="small" sx={{ marginRight: 1 }} />
            Sair
          </MenuItem>
        </Menu>
    </div>
  );
}
