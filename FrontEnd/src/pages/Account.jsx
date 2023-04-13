import {React, useEffect, useState} from 'react'
import { Modal, Typography, Button, Grid, Container, Tabs, Tab, Box, IconButton} from '@material-ui/core'


import useStyles from '../styles'
import SongCardFull from '../Components/SongCardFull/SongCardFull'
import SongUploadModal from '../Components/SongUploadModal/SongUploadModal'
import CreatePlaylistModal from '../Components/CreatePlaylistModal/CreatePlaylistModal'
import EditAccountModal from '../Components/EditAccountModal/EditAccountModal'

import song from '../audio/reds.mp3'

const websiteLink = 'https://google.com'



const Account = () => {
    const classes = useStyles();
    
    // const [playlists, setPlaylists] = useState([]);
    const [cardType, setCardType] = useState("Songs");
    const [userData, setUserData] = useState({
        username: 'wesleyminton',
        password: 'secret',
        birthday: '8/11/2001',
        bio: "This is a short description of the user's profile that they can enter for themselves. They can talk about what kind of music they make or what kind of playlists they make",
        websiteLink: 'http://fakeWebsite.com',
        firstname: 'Wesley',
        lastname: 'Minton',
        email: 'fakeEmail@gmail.com',
        songs: [],
        playlists: [1, 2, 3, 4]
    })
    const [songs, setSongs] = useState([]);

    const getUserData = async (params) => {
        // const response = await fetch('http://localhost:3001/accountInfo' + '?' + new URLSearchParams(params));
        const response = await fetch('http://localhost:3001/api/users/' + localStorage.getItem("userID"));
        const data = await response.json();

        return data;
    }

    const getSongInfo = async (id) => {
        const response = await fetch('http://localhost:3001/api/songs/' + id);
        const data = await response.json();

        // alert(JSON.stringify(data));
        return data;
    }

    const updateRender = () => {
        const params = { userId: localStorage.getItem('userID')};
        // console.log(localStorage.getItem('userID'));

        getUserData(params)
        .then((data) => {
            // alert(JSON.stringify(data))
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
                playlists: data.playlists
            })

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
        })
    }

    useEffect(() => {
        updateRender();
    }, []);

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
                    {cardType === "Songs" ? <SongUploadModal updateRender={updateRender}/> : <CreatePlaylistModal/>}
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
                                playlists={[{name: 'playlist 1', id: '1298214912'}, {name: 'playlist 2', id: '1238421052'}, {name: 'playlist 3', id: '184003592'}]}
                                />
                                
                            </Grid>
                        ))
                            :
                            userData.playlists.map((card) => (
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