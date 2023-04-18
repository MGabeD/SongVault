import {React, useState} from 'react'
import { Modal, Button, Box, TextField, Input, Container, Typography, IconButton, ListItem, ListItemText, 
    ListItemIcon, List,  } from '@material-ui/core'
import {ListItemButton, Checkbox} from '@mui/material'

import {PlaylistAdd} from '@material-ui/icons'

const AddToPlaylistModal = (props) => {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

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

    const onOpen = () => {
        // alert(JSON.stringify(JSON.parse(localStorage.getItem('playlists'))[0]))
        setOpen(true);
    }

    const sendToServer = async(playlistID) => {
        console.log(props)
        const params = {
            songId: props.songID
        }
        alert("params: " + JSON.stringify(params))
        const backendIP = process.env.REACT_APP_BACKEND_IP;

        alert(backendIP + '/api/playlists/' + playlistID + '?' + new URLSearchParams(params))
        const response = await fetch(backendIP + "/api/playlists/" + playlistID + "?" + new URLSearchParams(params), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
        // body: params,
        
         
         
        const data = await response.json();
        alert(JSON.stringify(data))
        return data;
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const addToPlaylist = (playlistID) => {
        alert("PlaylistID: " + playlistID)
        sendToServer(playlistID);
    }

    const handleSubmit = () => {
        
        // alert("songID: "+ props.songID)

        
        handleClose();
    }
    return (
        <div>
            <IconButton style={{color: 'grey'}} 
                onClick={onOpen}>
                <PlaylistAdd/>
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box component='form' sx={{ ...style}} onSubmit={handleSubmit}>
                    <h2 id="child-modal-title"> Add Song To Playlist </h2>

                    {JSON.parse(localStorage.getItem('playlists')).map((playlist) => (
                        <ListItem
                            key={playlist.name}
                            style={{borderWidth: '1px', borderColor: 'black'}}
                            disableGutters
                        >
                            <IconButton edge="end" aria-label="comments" 
                            onClick={() => {addToPlaylist(playlist)}}>
                                <PlaylistAdd />
                            </IconButton>
                            <ListItemText primary={playlist} style={{paddingLeft:'20px'}} />
                        </ListItem>
                    ))}
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

export default AddToPlaylistModal