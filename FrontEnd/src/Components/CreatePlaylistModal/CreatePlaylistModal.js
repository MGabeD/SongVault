import React from 'react'

import { Modal, Button, Box, TextField} from '@material-ui/core'

const CreatePlaylistModal = () => {

  const [open, setOpen] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState(null);

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
      setOpen(true);
  }

  const handleClose = () => {
      setImagePreview(null);
      setOpen(false);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      setImagePreview(reader.result);
    };
  
    reader.readAsDataURL(file);
  };


  const handleSubmit = (event) => {

    const sendToServer = async (params) => {
      const response = await fetch("http://localhost:3001/api/playlists", {
        method: "POST",
            body: params,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            // alert(error);
        })
    }

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data)
    alert(data.get('songName'));

    const formData = new FormData();
    formData.append("name", data.get('playlistName'));
    formData.append("owner", localStorage.getItem('userID'));
    formData.append("Image", data.get('playlistImg'));
    
        
    sendToServer(formData)
    // .then((data) => {
    //     alert(data.status);
    // })

    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" style={{color: 'white', border: "1px solid gray"}} onClick={onOpen}>
          Create New Playlist
      </Button>
  
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
      >

      <Box component='form' sx={{ ...style}} onSubmit={handleSubmit}>
          <h2 id="child-modal-title"> Playlist Creation </h2>

          <TextField
          margin="normal"
          required
          fullWidth
          id="playlistName"
          label="Playlist Name"
          name="playlistName"
          autoFocus
          />
              
          <label>
            Playlist Image: 
            <input
            type='file'
            accept='.png, .jpeg'
            name='playlistImg'
            id='playlistImg'
            required
            // onChange={e => setImg(e.target.value)}
            onChange={handleImageChange}

            style={{
                paddingLeft: '32px',
                marginTop: '10px',
            }}
            />
          </label>

              
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

export default CreatePlaylistModal