import React from 'react'
// import { useState } from 'react'

import {CssBaseline} from '@material-ui/core'
import NavBar from '../Components/NavBar/NavBar'

import SignIn from './SignIn'
import Profile from './Profile'
import SignUp from './SignUp'
import Account from './Account'

// MUI overview: https://mui.com/material-ui/getting-started/overview/
// Icons: https://mui.com/material-ui/material-icons/?query=profile
// Templates: https://mui.com/material-ui/getting-started/templates/

// youtube video tutorial: https://www.youtube.com/watch?v=Xoz31I1FuiY

// Color Scheme:
// const BackgroundColor = "#0C2D48"
// const PrimaryColor = "#145DA0"
// const SecondaryColor = "#2E8BC0"
// const HighlightColor = "#B1D4E0"

////////////////////////////////////
//      This is a dead file       //
//     This has been switched     //
//   To Layout.jsx and index.js   //
////////////////////////////////////

const LOGIN_EXT = '/login'
const PROFILE_EXT = '/profile'
const SIGNUP_EXT = '/signup'
const ACCOUNT_EXT = '/account'


const App = () => {
    const [loginStatus, setLoginStatus] = React.useState(false);

    return (
        <>
            <CssBaseline/>
            <NavBar
                loginStatus = {loginStatus}
                setLoginStatus = {setLoginStatus}
            />
            {window.location.pathname === LOGIN_EXT ?
                <SignIn
                loginStatus = {loginStatus}
                setLoginStatus = {setLoginStatus}
                /> : <></>
            }
            {window.location.pathname === PROFILE_EXT ?
                <Profile/> : <></>
            }
            {window.location.pathname === SIGNUP_EXT ?
                <SignUp/> : <></>
            }
            {window.location.pathname === ACCOUNT_EXT  ?
                <Account/> : <> </>
            }
        </>
    )
}

export default App;