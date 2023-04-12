import {React, useState} from 'react'
import { Modal, Button, Box, TextField, Input, Container, Typography, IconButton} from '@material-ui/core'
import { MultilineChart, Settings } from '@material-ui/icons'

const EditAccountModal = (props) => {
    const [open, setOpen] = useState(false);

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
        setOpen(false);
    }

    const handleSubmit = (event) => {
        // Getting Data from Modal Form
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        // preparing formData to send PUT request
        const formData = new FormData();
        formData.append("firstName", data.get('newFirstName'));
        formData.append("lastName", data.get('newLastName'));
        formData.append("userName", data.get('newUsername'));
        formData.append("password", data.get("newPassword"));
        formData.append("birthday", data.get("newBirthday"));
        formData.append("bio", data.get('newBio'));
        formData.append("email", props.email);
        formData.append("stageName", "notImplemented")
        formData.append("User", localStorage.getItem('userID'));

        // sending Put request to change info about the user's account
        fetch("http://localhost:3001/api/user", {
            method: "PUT",
            body: formData,
        }).then((response) => {
            console.log(response);
            alert("Account Information Successfully Updated")
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
        console.log('after post req');

        handleClose();
    }

    return (
        <div>
            <IconButton style={{color: 'grey'}} 
                onClick={onOpen}>
                <Settings/>
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box component='form' sx={{ ...style}} onSubmit={handleSubmit}>
                    <h2 id="child-modal-title"> Edit Account Details</h2>

                    <TextField
                    margin="normal"
                    fullWidth
                    id="newUsername"
                    label="Username"
                    name="newUsername"
                    defaultValue={props.username}
                    autoFocus
                    />

                    <TextField
                    margin="normal"
                    fullWidth
                    id="newPassword"
                    label="Password"
                    name="newPassword"
                    defaultValue={props.password}
                    />

                    <TextField
                    margin="normal"
                    fullWidth
                    id="newFirstName"
                    label="First Name"
                    name="newFirstName"
                    defaultValue={props.firstName}
                    />
                    <TextField
                    margin="normal"
                    fullWidth
                    id="newLastName"
                    label="Last Name"
                    name="newLastName"
                    defaultValue={props.lastName}
                    />                    

                    <TextField
                    margin="normal"
                    fullWidth
                    id="birthday"
                    label="Birthday"
                    name="newPassword"
                    defaultValue={props.birthday}
                    />

                    <TextField
                    margin="normal"
                    fullWidth
                    id="newBio"
                    label="Bio"
                    name="newBio"
                    defaultValue={props.bio}
                    
                    
                    maxRows={null}
                    />

                    <TextField
                    margin="normal"
                    fullWidth
                    id="newWebsiteLink"
                    label="Website Link"
                    name="newWebsiteLink"
                    defaultValue={props.websiteLink}
                    />

                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default EditAccountModal