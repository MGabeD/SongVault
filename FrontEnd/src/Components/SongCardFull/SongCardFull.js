import React from 'react'

import { Typography, Card, CardActions, CardContent, CardMedia, IconButton} from '@material-ui/core'
import {Favorite, Share, PlaylistAdd} from '@material-ui/icons'

import useCardStyles from './CardFullStyles'

const SongCardFull = (props) => {
    const classes = useCardStyles();
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
            aria-label="add to favorites">
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