import * as React from 'react'
import { Box, Typography, AppBar, Toolbar, IconButton, Button} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

import useNavbarStyles from './NavBarStyles'
import ProfileMenu from './ProfileMenu/ProfileMenu'

const NavBar = (props) => {
    const classes = useNavbarStyles();

    const handleLinkClick = (href) => {
        window.location.pathname = href;
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="relative" style={{color: "#FFFFFF", backgroundColor: "#20202d"}}>
                    <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2}}
                    >
                        <Menu/>
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SongVault
                    </Typography>
                    <div className={classes.loginGroup}>
                        <Button variant="text" color='inherit'
                        onClick={() => handleLinkClick("/")}
                        >
                            Home
                        </Button>
                        <Button variant="text" color='inherit'
                        onClick={() => handleLinkClick("/discover")}
                        >
                            Discover
                        </Button>

                        <Button variant="text" color='inherit'
                        onClick={() => handleLinkClick("/trending")}
                        >
                            Trending
                        </Button>

                        <ProfileMenu
                        loginStatus = {props.loginStatus}
                        setLoginStatus = {props.setLoginStatus}
                        />
                    </div>
                    
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default NavBar;