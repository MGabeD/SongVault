import {React, useEffect, useState} from 'react'
import { Typography, Button, Grid, Container, Tabs, Tab, Box} from '@material-ui/core'

import useStyles from '../styles'
import SongCardFull from '../Components/SongCardFull/SongCardFull'
import SongUploadModal from '../Components/SongUploadModal/SongUploadModal'
import CreatePlaylistModal from '../Components/CreatePlaylistModal/CreatePlaylistModal'
import EditAccountModal from '../Components/EditAccountModal/EditAccountModal'
import PlaylistCardFull from '../Components/PlaylistCardFull/PlaylistCardFull'

const Account = () => {
    const classes = useStyles();
    
    const [cardType, setCardType] = useState("Songs");
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        birthday: '',
        bio: "",
        websiteLink: 'http://yourWebsiteHere.com',
        firstname: '',
        lastname: '',
        email: 'yourEmailHere@gmail.com',
        songs: [],
    })

    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const backendIP = process.env.REACT_APP_BACKEND_IP; 

    const getUserData = async (params) => {
        console.log(backendIP + '/api/users/' + localStorage.getItem("userID"))
        const response = await fetch(backendIP + '/api/users/' + localStorage.getItem("userID"), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();

        return data;
    }

    const getSongInfo = async (id) => {
        const response = await fetch(backendIP + '/api/songs/' + id);
        const data = await response.json();

        return data;
    }

    const getPlaylistInfo = async (id) => {
        const response = await fetch(backendIP + '/api/playlists/' + id);
        const data = await response.json();

        return data;
    }

    const updateRender = () => {
        const params = { userId: localStorage.getItem('userID')};

        getUserData(params)
        .then((data) => {
            setUserData({
                username: data.userName,
                password: data.password,
                birthday: data.birthday,
                bio: data.bio,
                websiteLink: 'http://fakeWebsite.com',
                firstname: data.firstName,
                lastname: data.lastName,
                email: data.email,
                songs: data.songs,
            })
            
            
            localStorage.setItem('playlists', JSON.stringify(data.playlists));

            const updatedSongs = [];
            Promise.all(data.songs.map((songID) => {
                return getSongInfo(songID)
                .then((songInfo) => {
                    updatedSongs.push(songInfo);
                })
            }))
            .then(() => {
                setSongs(updatedSongs);
            })

            const updatedPlaylists = [];
            Promise.all(data.playlists.map((playlistID) => {
                return getPlaylistInfo(playlistID)
                .then((playlistInfo) => {
                updatedPlaylists.push(playlistInfo);
            })
            }))
            .then(() => {
                setPlaylists(updatedPlaylists);
            })
        })
    }

    useEffect(() => {
        updateRender();
    }, []);

    const handleChange = (event, newValue) => {
        setCardType(newValue);
    }

    const handleWebsiteLink = () => {
        window.location.href = userData.websiteLink;
    }

    return (
        <>
            <main className={classes.main}>
                <div style={{justifyContent:'flex-end', flexDirection:'row', display: 'flex', paddingTop: '10px'}}>
                    {cardType === "Songs" ? <SongUploadModal updateRender={updateRender} username={userData.username}/> : <CreatePlaylistModal updateRender={updateRender}/>}
                    <EditAccountModal 
                    username={userData.username}
                    password={userData.password}
                    firstName={userData.firstname}
                    lastName={userData.lastname}
                    email={userData.email}
                    birthday={userData.birthday}
                    bio={userData.bio}
                    websiteLink={userData.websiteLink}
                    setUserData={setUserData}
                    />
                </div>
                <div className={classes.container} >
                    
                    <Container maxWidth='sm' style={{marginTop: '100px'}}>
                        
                        <Typography variant='h2' align='center' className={classes.accountNameTitle}> 
                            {userData.firstname} {" "} {userData.lastname}
                        </Typography>
                        <Typography variant='h5' align='center' className={classes.accountDescription} paragraph>
                            {userData.bio}

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
                                title={card.name}
                                desc={""}
                                audio={card.mp3Link}
                                image={card.imageLink}
                                songID={card._id}
                                updateRender={updateRender}
                                // DELETE ME WHEN 
                                // playlists={localStorage.getItem('playlists')}
                                />
                            </Grid>
                        ))   :
                        <></>}
                         
                        {cardType === "Playlists" ? 
                           playlists.map((playlist) => (
                            <Grid item key={playlist._id} xs={12} sm={6} md={4} lg={3}>
                                <PlaylistCardFull
                                title={playlist.name}
                                image={playlist.imageLink}
                                songs={playlist.songs}
                                playlistID={playlist._id}
                                updateRender={updateRender}
                                />
                            </Grid>
                            )
                            ) : <></>
                        }
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default Account