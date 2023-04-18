import {React} from 'react'

import { Typography, Card, CardActions, CardContent, CardMedia, IconButton, Grid} from '@material-ui/core'
import {Favorite, PlaylistAdd} from '@material-ui/icons'

import useCardStyles from './CardFullStyles'
import AddToPlaylistModal from '../AddToPlaylistModal/AddToPlaylistModal'

const SongCardFull = (props) => {
    const classes = useCardStyles();

    const onLike = () => {
        alert('no');
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
                    <AddToPlaylistModal 
                    songID={props.songID}
                    updateRender={props.updateRender}
                    />
                </Grid>
            </Grid>        
        </CardContent>
    </Card>
  )
}

export default SongCardFull;