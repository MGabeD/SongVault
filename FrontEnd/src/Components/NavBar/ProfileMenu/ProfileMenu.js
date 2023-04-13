import * as React from 'react';
import {Menu, MenuItem, IconButton} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'

export default function ProfileMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        props.setLoginStatus(false);
        localStorage.setItem('loginStatus', 'invalid');
        localStorage.setItem('userID', 'null');
        localStorage.setItem('playlists', '[]');
        handleClose();
        window.location.pathname = "";
    }

    const handleLinkSelect = (pathname) => {
        window.location.pathname = pathname;
        handleClose();
    }


    return (
        <div>
        <IconButton
                size="large"
                edge='start'
                color='inherit'
                aria-label='profile'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{marginLeft: "5px"}}
            >
                <AccountCircle/>
            </IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            style={{marginTop: "35px"}}
        >
            {localStorage.getItem('loginStatus') === 'valid' ?
            <>
            {/* <MenuItem> Home </MenuItem> */}
            {/* <MenuItem onClick={() => handleLinkSelect("profile")}>Profile</MenuItem> */}
            <MenuItem onClick={() => handleLinkSelect("account")}>My account</MenuItem>
            <MenuItem onClick={() => {alert("not built yet")}}> Messages </MenuItem>
            <MenuItem onClick={handleLogoutClick}> Logout </MenuItem>
            </>
            :
            <>
            {/* <MenuItem onClick={() => handleLinkSelect('/')}> Home </MenuItem>
            <MenuItem onClick={() => handleLinkSelect('/Discover')}> Discover </MenuItem> */}
            <MenuItem onClick={() => handleLinkSelect('/login')}> Login </MenuItem>
            <MenuItem onClick={() => handleLinkSelect('/signup')}> SignUp </MenuItem>
            </>}
            
        </Menu>
        </div>
    );
}