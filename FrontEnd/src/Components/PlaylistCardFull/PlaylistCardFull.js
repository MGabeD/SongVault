import { IconButton } from '@material-ui/core'
import { Typography, Card, CardActions, CardContent, CardMedia, Grid} from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import React from 'react'
import EditPlaylistModal from '../EditPlaylistModal/EditPlaylistModal'
import PlaylistDisplayModal from '../PlaylistDisplayModal/PlaylistDisplayModal'

import useCardStyles from '../SongCardFull/CardFullStyles'

const PlaylistCardFull = (props) => {
    const classes = useCardStyles();
    return (
        <Card className={classes.card} 
        style={{
            flexDirection:"column",
            }}
        > 
        <CardMedia
            component='img'
            className={classes.cardMedia} 
            image={props.image}
            alt="./images/githubPfP.jpeg"
            style={{maxHeight: '200px', width: '100%'}}
            height={'100px'}
            // onClick={() => {alert("clicked: " + props.title)}}
            style={{cursor: "pointer",}}
        />
        <CardContent className={classes.cardContent}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant='h5'>
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item>
                    {/* <EditPlaylistModal/> */}
                    <PlaylistDisplayModal 
                    title={props.title} 
                    songs={props.songs} 
                    image={props.image}
                    playlistID={props.playlistID}
                    updateRender={props.updateRender}/>
                </Grid>
            </Grid>        
        </CardContent>
    </Card>
    )
}

export default PlaylistCardFull