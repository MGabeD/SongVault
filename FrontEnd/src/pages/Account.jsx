import {React, useEffect, useState} from 'react'
import { Modal, Typography, Button, Grid, Container, Tabs, Tab, Box, IconButton} from '@material-ui/core'


import useStyles from '../styles'
import SongCardFull from '../Components/SongCardFull/SongCardFull'
import SongUploadModal from '../Components/SongUploadModal/SongUploadModal'
import CreatePlaylistModal from '../Components/CreatePlaylistModal/CreatePlaylistModal'
import EditAccountModal from '../Components/EditAccountModal/EditAccountModal'

const websiteLink = 'https://google.com'

const Account = () => {
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getUserData = async (params) => {
            const response = await fetch('http://localhost:3001/accountInfo' + '?' + new URLSearchParams(params));
            const data = await response.json();

            return data;
        }

        const params = { userID: localStorage.getItem('userID')};

        getUserData(params)
        .then((data) => {
            setSongs(data.songs);
            setPlaylists(data.playlists);
        })
    }, []);

    const classes = useStyles();

    const [cardType, setCardType] = useState("Songs");
    const [uploadingSong, setUploadingSong] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (event, newValue) => {
        setCardType(newValue);
    }

    const handleWebsiteLink = () => {
        alert(localStorage.getItem('userID'))
        // window.location.href = websiteLink;
    }

    const editAccount = () => {
        alert("can't edit account details yet");
    }

    return (
        <>
            <main className={classes.main}>
                <div style={{justifyContent:'flex-end', flexDirection:'row', display: 'flex', paddingTop: '10px'}}>
                    {cardType === "Songs" ? <SongUploadModal/> : <CreatePlaylistModal/>}
                    
                    
                    
                    
                    {/* <IconButton style={{color: 'grey'}} 
                    onClick={editAccount}>
                        <Settings/>
                    </IconButton> */}
                    <EditAccountModal/>
                </div>
                <div className={classes.container} >
                    
                    <Container maxWidth='sm' style={{marginTop: '100px'}}>
                        
                        <Typography variant='h2' align='center' className={classes.accountNameTitle}> 
                            Wesley Minton
                        </Typography>
                        <Typography variant='h5' align='center' className={classes.accountDescription} paragraph>
                            This is a short description of the user's profile that they can enter for themselves.
                            They can talk about what kind of music they make or what kind of playlists they make

                        </Typography>
                        <div className={classes.buttons}>
                            <Grid container spacing={2} justify='center'>
                                <Grid item>
                                    <Button 
                                    variant='outlined' 
                                    color='primary'
                                    onClick={handleWebsiteLink}>
                                        See my Website
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', paddingBottom: '2vh' }}>
                    <Tabs
                        color='white'
                        value={cardType}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="primary"
                    >
                        <Tab value="Songs" label="Songs" style={{color: 'white'}}/>
                        <Tab value="Playlists" label="Playlists" style={{color: 'white'}}/>
                    </Tabs>
                </Box>
                <Container >
                    <Grid container spacing={4}>
                        {cardType === "Songs" ? songs.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
                                <SongCardFull
                                title={cardType === "Songs" ? "Song Title" : "Playlist Title"}
                                desc={cardType==="Songs" ? "This is a short description of the song" : "This is a short description of the playlist"}
                                image="https://source.unsplash.com/random/?Music"/>
                            </Grid>
                        ))
                            :
                            playlists.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
                                <SongCardFull
                                title={cardType === "Songs" ? "Song Title" : "Playlist Title"}
                                desc={cardType==="Songs" ? "This is a short description of the song" : "This is a short description of the playlist"}
                                image="https://source.unsplash.com/random/?Music"/>
                            </Grid>
                            )
                        )}
                        
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default Account