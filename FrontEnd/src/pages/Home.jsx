import { Typography, Grid, Button, Box, ButtonGroup } from '@material-ui/core'
import { textAlign } from '@mui/system';
import React from 'react'

// this is how to import photos for react/mui
// import stockPhoto from '../images/StockProducerImage.jpeg'
import stockPhoto from '../images/SoundBoard.jpg'

import useStyles from '../styles';

const Home = () => {
    const classes = useStyles();

    const handleLinkSelect = (pathname) => {
        window.location.pathname = pathname;
    }

    return (
        <Box className={classes.homePageBox}>
            <div className={classes.textOnPhotoContainer}>
                <img src={stockPhoto} style={{position: 'relative', width: '100%'}}/>
                <Typography variant='h1' className={classes.centeredTextOnPhoto}>
                    SongVault
                </Typography>
                <div className={classes.buttonGroup}>
                    <Button variant="text" className={classes.button} onClick={() => handleLinkSelect("discover")}> 
                        Discover 
                    </Button>
                    {localStorage.getItem('loginStatus') !== 'valid' ? 
                    <Button variant="text" className={classes.button} onClick={() => handleLinkSelect("login")}>
                        Login
                    </Button> :
                    <></>}
                    
                </div>
                {/* <div style={{position: 'fixed', top: '62%', backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                    <Typography variant="h4" fontWeight={700} className={classes.title}>
                        Promote your music
                    </Typography>
                    <Typography variant="h6" className={classes.subtitle}>
                        Upload your song, rate other artists' songs, and contact curators to 
                        get your music added to their playlists.
                    </Typography>
                </div> */}
                
            </div>
            
            <div className={classes.centeredElements}>
                <Typography variant="h2" fontWeight={700} className={classes.title}>
                    Promote your music
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Upload your song, rate other artists' songs, and contact curators to 
                    get your music added to their playlists.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '200px', fontSize: '16px' }}
                    onClick={() => handleLinkSelect('discover')}
                >
                    Discover Music
                </Button>
            </div>
        </Box>
    )
}

export default Home