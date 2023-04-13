import {React} from 'react'

import { Typography, Card, CardActions, CardContent, CardMedia, IconButton, Grid} from '@material-ui/core'
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
            style={{maxHeight: '200px', width: '100%'}}
            height={'100px'}
        />
        <CardContent className={classes.cardContent}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant='h5'>
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {props.desc}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <audio controls title='Song Title' style={{width: '100%', }}>
                        <source src={props.audio} type="audio/mp3"/>
                        Your browser does not support the audio tag.
                    </audio>
                </Grid>
                <Grid item>
                    <IconButton
                    aria-label="add to favorites"
                    onClick={onLike}
                    xs={8}
                    >
                        <Favorite />
                    </IconButton>
                    <IconButton
                        aria-label="Share">
                            <PlaylistAdd />
                    </IconButton>
                </Grid>
            </Grid>
            
            
        </CardContent>
        <CardActions>
            
        </CardActions>
    </Card>
  )
}

export default SongCardFull;