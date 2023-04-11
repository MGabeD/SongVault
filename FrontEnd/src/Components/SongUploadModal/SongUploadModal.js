import React, { useRef } from 'react'

import { Modal, Button, Box, TextField, Input, Container, Typography} from '@material-ui/core'

const SongUploadModal = () => {
    const [open, setOpen] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState(null);

    const inputRef = useRef();

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

    // const handleImgChange = (event) => {
    //     setImg(URL.createObjectURL(event.target.value))
    // }

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
            const response = await fetch("http://localhost:3001/uploadSong" + '?' + new URLSearchParams(params))
            const status = await response.json();

            return status;
        }

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        alert(data.get('songName'));
        // alert(data.get('songMP3'));
        // alert(data.get('songImg'));

        const params = {
            Name: data.get('songName'),
            Audio: data.get('songMP3'),
            Image: data.get('songImg'),
        }
        
        sendToServer(params)
        .then((data) => {
            alert(data.status);
        })

        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" style={{color: 'white', border: "1px solid gray"}} onClick={onOpen}>
                Upload Song
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box component='form' sx={{ ...style}} onSubmit={handleSubmit}>
                    <h2 id="child-modal-title"> Upload A Song</h2>

                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="songName"
                    label="Song Name"
                    name="songName"
                    autoFocus
                    />

                    <label >
                        Song Audio File: 
                        <input
                        type='file'
                        accept='.mp3'
                        name='songMP3'
                        id='songMp3'
                        required
                        

                        style={{
                            paddingLeft: '5px',
                            marginTop: '5px',
                        }}
                        />  
                    </label>
                    
                    <label>
                        Song Image: 
                        <input
                        type='file'
                        accept='.png, .jpeg'
                        name='songImg'
                        id='songImg'
                        required
                        // onChange={e => setImg(e.target.value)}
                        onChange={handleImageChange}
                        ref={inputRef}

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
                        // justifyContent: 'center',
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
                    Upload
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default SongUploadModal