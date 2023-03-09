import React from 'react'

import {Container, Typography, Card, CardMedia, CardContent} from '@material-ui/core'

import useStyles from './BottomSongControlUIStyles'
import song from '../../audio/reds.mp3'

const songProps = {
    title: "Reds",
    artist: "James Becker",
    image: "https://source.unsplash.com/random",
    audio: song
}

const BottomSongControlUI = (props) => {
    const classes = useStyles()
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
                    <Typography variant="h5" gutterBottom>
                        {props.title}
                    </Typography>
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