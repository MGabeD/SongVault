import { CssBaseline, Typography} from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar'
import useStyles from '../styles'

const Layout = (props) => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline/>
            <NavBar
                loginStatus = {props.loginStatus}
                setLoginStatus = {props.setLoginStatus}
            />
            <Outlet/> {/** Renders currently selected route */}
            <footer className={classes.footer}>
                <Typography variant='h6' align='center' gutterBottom>
                    SongVault
                </Typography>
                <Typography variant='subtitle1' align='center' color='inherit'>
                    Made by Wesley Minton, Gabe Denton, and Theo Hodges
                </Typography>
            </footer>
        </>
    )
}

export default Layout