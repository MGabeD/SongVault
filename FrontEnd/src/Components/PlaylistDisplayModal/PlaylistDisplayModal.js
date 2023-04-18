import {React, useState} from 'react'

import { Settings } from '@material-ui/icons'
import { IconButton, Modal, Button, Box, TextField, Grid, } from '@material-ui/core'

import song from '../../audio/reds.mp3'
import PlayableSongCardSmall from '../PlayableSongCardSmall/PlayableSongCardSmall'
// import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

const songProps = {
    title: "Reds",
    artist: "James Becker",
    image: "http://source.unsplash.com/random?music",
    audio: song
}


const PlaylistDisplayModal = (props) => {
    const [open, setOpen] = useState(false);
    const [songs, setSongs] = useState([]);

    const getSongInfo = async (id) => {
        const backendIP = process.env.REACT_APP_BACKEND_IP;
        const response = await fetch(backendIP + '/api/songs/' + id);
        const data = await response.json();

        // alert(JSON.stringify(data));
        return data;
    }

    const getSongs = async () => {
        const updatedSongs = [];
        Promise.all(props.songs.map((songID) => {
            return getSongInfo(songID)
            .then((songInfo) => {
                // alert(JSON.stringify(songInfo))
                updatedSongs.push(songInfo);
            })
        }))
        .then(() => {
            setSongs(updatedSongs);
        })
    }

    const handleOpen = () => {
        getSongs();
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        flexDirection: 'column',
        display: 'flex'
      };
    
      const handleSubmit = () => {
          handleClose()
      }

    return (
        <div>
            <Button onClick={handleOpen}>
                <p> View Playlist</p>
            </Button>
        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >

        <Box component='form' sx={{ ...style}} onSubmit={handleSubmit}>
            {/* <img src={props.image} style={{width: '60%'}}/> */}
            <h2 id="child-modal-title"> {props.title} </h2>


            <Grid container spacing={0} xs={12}>
                {/* <Grid xs={3}>
                    <IconButton onClick={() => {alert("remove from playlist")}}>
                        <Settings/>
                    </IconButton>
                </Grid> */}
                {songs.map((song) => (
                    
                    <Grid item xs={12} style={{margin: '0.3px'}}>
                        <PlayableSongCardSmall audio={song.mp3Link} title={song.name} artist={song.artistNames[0]} image={song.imageLink}/>
                    </Grid>
                ))}

            </Grid>

                


            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Done
            </Button>
            </Box>
        </Modal>
        </div>
    )
}

export default PlaylistDisplayModal