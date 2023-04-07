import React from 'react'

import { Typography, Card, CardActions, CardContent, CardMedia, IconButton} from '@material-ui/core'
import {Favorite, Share, PlaylistAdd} from '@material-ui/icons'

import useCardStyles from './CardFullStyles'

const SongCardFull = (props) => {
    const classes = useCardStyles();

    const onLike = () => {
        const serverLike = async (params) => {
            const response = await fetch('http://localhost:3001/likeSong' + '?' + new URLSearchParams(params));
            const status = await response.json();

            return status;
        }

        const params = {songID : "fakeSongID"}
        serverLike(params)
        .then((data) => {
            alert(data.status);
        })
    }
  return (
    <Card className={classes.card} style={{flexDirection:"column"}}> 
        <CardMedia
            component='img'
            className={classes.cardMedia} 
            image={props.image}
            title="Song Title"
            alt="./images/githubPfP.jpeg"
        />
        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h5'>
                {props.title}
            </Typography>
            <Typography>
                {props.desc}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton
            aria-label="add to favorites"
            onClick={onLike}
            >
                <Favorite />
            </IconButton>
            <IconButton
            aria-label="Share">
                <Share />
            </IconButton>
            
            <div
            style={{width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row'}}
            >
                <IconButton
                aria-label="Share">
                    <PlaylistAdd />
                </IconButton>
            </div>
        </CardActions>
    </Card>
  )
}

export default SongCardFull;