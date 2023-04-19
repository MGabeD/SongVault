import {React, useRef} from 'react'

import {Container, Typography, Card, CardMedia, CardContent, IconButton} from '@material-ui/core'
import { Favorite } from '@material-ui/icons'

import AddToPlaylistModal from '../AddToPlaylistModal/AddToPlaylistModal'
import useStyles from './BottomSongControlUIStyles'


const BottomSongControlUI = (props) => {
    const classes = useStyles()
    const audioRef = useRef();

    const onLike = () => {
        const serverLike = async (params) => {
            const backendIP = process.env.REACT_APP_BACKEND_IP;
            const response = await fetch(backendIP + "/api/likes/" + localStorage.getItem('userID'), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params),
            })
            const data = await response.json();
            alert(JSON.stringify(data));
        }
    
        const params = {songId : props.id}
        serverLike(params)
        .then((data) => {
            alert(data.status);
        })

        
    }

    const sendPlayToServer = async (songID) => {
        const backendIP = process.env.REACT_APP_BACKEND_IP;
        alert("SongID: " + songID);
        const response = await fetch(backendIP + "/api/play/" + songID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();

        alert(JSON.stringify(data));
        return data;

    }
    const playingAudio = (songID) => {
        // console.log(audioRef.current.currentTime);
        if (audioRef.current.currentTime === 0) {
            sendPlayToServer(songID);
        }
    }

    return (
        <div className={classes.container}>
            <Card
                className={classes.card}
            >
                <CardMedia
                component="img"
                height="151"
                image={props.image}
                alt={props.title}
                sx={{ padding: "1em 1em 0 1em" }}
                />
            </Card>
            <Container style={{height: '100%', justifyContent: 'flex-end', flexDirection: 'column', display: 'flex', justifyItems:"flex-start"}}>
                <Container style={{height: '50%'}}>
                    <div style={{display: 'flex', flexDirection:'row'}}>
                        <Typography variant="h5" gutterBottom style={{width:'90%'}}>
                            {props.title}
                        </Typography>
                        {localStorage.getItem('loginStatus') === 'valid' ? 
                        <div style={{justifyContent: 'flex-end', flexDirection: 'row', width: '10%', display: 'flex', marginTop: 0}}>
                            <IconButton
                            aria-label="add to favorites"
                            onClick={onLike}
                            xs={8}
                            style={{marginTop: 0, }}
                            >
                                <Favorite />
                            </IconButton> 
                            <AddToPlaylistModal playlists={props.playlists}/>
                        </div> 
                    :
                    <></>}
                        
                    </div>
                    <Typography variant="subtitle">
                        {props.artist}
                        
                    </Typography>
                </Container>
                <audio controls title='Song Title' style={{width: '100%'}} onPlay={() => {playingAudio(props.id)}} ref={audioRef}>
                    <source src={props.audio} type="audio/mp3" />
                    Your browser does not support the audio tag.
                </audio>
            </Container>
        </div>
    )
}

export default BottomSongControlUI