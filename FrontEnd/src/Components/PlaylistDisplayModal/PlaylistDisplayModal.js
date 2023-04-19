import {React, useState} from 'react'

import { Remove } from '@material-ui/icons'
import { IconButton, Modal, Button, Box, Grid, } from '@material-ui/core'
import PlayableSongCardSmall from '../PlayableSongCardSmall/PlayableSongCardSmall'


const PlaylistDisplayModal = (props) => {
    const [open, setOpen] = useState(false);
    const [songs, setSongs] = useState([]);

    const getSongInfo = async (id) => {
        const backendIP = process.env.REACT_APP_BACKEND_IP;
        const response = await fetch(backendIP + '/api/songs/' + id);
        const data = await response.json();
        return data;
    }

    const getSongs = async () => {
        const updatedSongs = [];
        Promise.all(props.songs.map((songID) => {
            return getSongInfo(songID)
            .then((songInfo) => {
                updatedSongs.push(songInfo);
            })
        }))
        .then(() => {
            setSongs(updatedSongs);
        })
    }

    const deleteSong = async (songID) => {
        const params = {
            songId: songID,
            type: 1
        }
        const backendIP = process.env.REACT_APP_BACKEND_IP;
        const response = await fetch(backendIP + "/api/playlists/" + props.playlistID + "?" + new URLSearchParams(params), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await response.json();
        alert(JSON.stringify(data));
        return data;
    }

    const handleOpen = () => {
        getSongs();
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleRemoveClick = (songID) => {
        deleteSong(songID)
        .then(() => {
            props.updateRender();
        })
        .then(() => {
            getSongs();
        })
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
            <h2 id="child-modal-title"> {props.title} </h2>

            <Grid container spacing={0} xs={12}>
                {songs.map((song) => (
                    <Grid item xs={12} style={{margin: '0.3px'}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <IconButton onClick={() => {handleRemoveClick(song._id)}}>
                                <Remove/>
                            </IconButton>
                            <PlayableSongCardSmall audio={song.mp3Link} title={song.name} artist={song.artistNames[0]} image={song.imageLink}/>
                        </div>
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