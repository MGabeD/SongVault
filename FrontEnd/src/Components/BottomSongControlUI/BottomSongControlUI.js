import React from 'react'

import {Container, Typography, Card, CardMedia, CardContent, IconButton} from '@material-ui/core'
import { Favorite } from '@material-ui/icons'

import AddToPlaylistModal from '../AddToPlaylistModal/AddToPlaylistModal'
import useStyles from './BottomSongControlUIStyles'
import song from '../../audio/reds.mp3'

const songProps = {
    title: "Reds",
    artist: "James Becker",
    image: "https://source.unsplash.com/random",
    audio: song
}

const propPlaylists = [{name: 'playlist1', id: '12398124982'}, {name: 'playlist2', id: '1285830290'}, {name: 'playlist3', id: '1284883593'}]


const BottomSongControlUI = (props) => {
    const classes = useStyles()

    const onLike = () => {
        const serverLike = async (params) => {
            const response = await fetch("http://localhost:3001/api/likes/" + localStorage.getItem('userID'), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params),
            })
            const data = await response.json();
            alert(JSON.stringify(data));
        }
    
        const params = {songID : songProps.id}
        serverLike(params)
        .then((data) => {
            alert(data.status);
        })
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
                        <div style={{justifyContent: 'flex-end', flexDirection: 'row', width: '10%', display: 'flex', marginTop: 0}}>
                            <IconButton
                            aria-label="add to favorites"
                            onClick={onLike}
                            xs={8}
                            style={{marginTop: 0, }}
                            >
                                <Favorite />
                            </IconButton> 
                            <AddToPlaylistModal playlists={propPlaylists}/>
                        </div>
                        
                    </div>
                    <Typography variant="subtitle">
                        {props.artist}
                    </Typography>
                </Container>
                <audio controls title='Song Title' style={{width: '100%'}}>
                    <source src={props.audio} type="audio/mp3"/>
                    Your browser does not support the audio tag.
                </audio>
            </Container>
        </div>
    )
}

export default BottomSongControlUI