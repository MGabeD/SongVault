import {React, useState} from 'react'

import { Settings } from '@material-ui/icons'
import { IconButton, Modal, Button, Box, TextField} from '@material-ui/core'

const EditPlaylistModal = () => {
    const [open, setOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true)
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
        alert('need to create the put api call');
        handleClose();
    }

    return (
        <div>
      <IconButton onClick={handleOpen}>
          <Settings/>
      </IconButton>
  
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
      >

      <Box component='form' sx={{ ...style}} onSubmit={handleSubmit}>
          <h2 id="child-modal-title"> Edit Playlist </h2>

          <TextField
          margin="normal"
          required
          fullWidth
          id="playlistName"
          label="Playlist Name"
          name="playlistName"
          autoFocus
          />

              
          <div style={{
            width: "300px",
            height: "200px",
            overflow: "hidden",
            position: 'relative',
          }}>
            <img 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%', 
                objectFit: 'contain',
                objectPosition: 'center',
            }}
            src={imagePreview} 
            alt="Preview" />
          </div>

          <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Create
          </Button>
        </Box>
      </Modal>
    </div>
    )
}

export default EditPlaylistModal