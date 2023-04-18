import { Card, CardContent, CardMedia, Container, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './PlayableSongCardSmallStyles'

import song from '../../audio/reds.mp3'

/**
 * [done] Need to make these have some maxwidths based on % so that large title/artist name doesn't fuck it all up
 * [not possible] need to change the background color of audio controls
 * [done (kinda)]spacing is all fucked
 * I want to add an automatic scroll through if the title/artist names are too long
 */

// const songProps = {
//     title: 'Song Title this is a test of a very long song title that will certainly not fit',
//     artist: 'Artist Name this is another test',
//     audio: song,
// }

const playingProps = true;

const PlayableSongCardSmall = (props) => {
    const classes = useStyles();
    return (
        
        
        <Card className={classes.container}>

            <CardMedia
            style={{height: '100%', width: '45px'}}
            image={props.image}
            />
            <CardContent className={classes.songTitle}>
                <Typography variant='body1' style={{color: 'white'}}>
                    {props.title}
                </Typography>
            </CardContent>
            <CardContent className={classes.artistName}>
                <Typography variant='caption' style={{color: 'white'}}>
                    {props.artist}
                </Typography>
            </CardContent>
            {playingProps ? 
            <audio controls title='Song Title' style={{width: '50%', height: '90%', }}>
                <source src={props.audio} type="audio/mp3"/>
                Your browser does not support the audio tag.
            </audio>
            : <></>
            }
            
        </Card>
    )
}

export default PlayableSongCardSmall