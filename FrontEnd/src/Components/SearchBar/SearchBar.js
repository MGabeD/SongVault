import { Container, Button } from '@material-ui/core'
import React from 'react'
import {useState} from 'react'

import useStyles from './searchbarStyles'
import stockPhoto from '../../images/Headphones.avif'


const SearchBar = (props) => {
    const classes = useStyles();

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const getSongInfo = async (id) => {
        const backendIP = process.env.REACT_APP_BACKEND_IP;
        const response = await fetch(backendIP + '/api/songs/' + id);
        const data = await response.json();

        // alert(JSON.stringify(data));
        return data;
    }

    const handleSubmit = () => {
        const reqSearch = async (params) => {
            const backendIP = process.env.REACT_APP_BACKEND_IP;
            const response = await fetch(backendIP + '/api/discover?' + new URLSearchParams(params));
            const results = await response.json();
    
            console.log(results);
            return results;       
        }

        const params = {userName: searchInput };
        reqSearch(params)
        .then((data) => {
            // alert(JSON.stringify(data))
            
            const allResponses = []
            data.songs.map((songID) => {
                allResponses.push(songID)
                return true;
            })
            data.matchingSongs.map((songID) => {
                if (!allResponses.includes(songID)) {
                    allResponses.push(songID)                        
                }
                return true;
            })
            const updatedSongs = [];
            Promise.all(allResponses.map((songID) => {
                return getSongInfo(songID)
                .then((songInfo) => {
                    // alert(JSON.stringify(songInfo))
                    updatedSongs.push(songInfo);
                })
              }))
              .then(() => {
                props.setSongs(updatedSongs);
              })
        })
        
        console.log(searchInput);
    }

    const handleKeyInput = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <Container className={classes.searchBarOnPhotoContainer}>
            <img src={stockPhoto} alt={"alt"} style={{position: 'relative', width: '100%'}}/>
            <div className={classes.searchBarButtonContainer}>
                <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} 
                className={classes.searchBarInput}
                onKeyDown={handleKeyInput}
                />

                <Button 
                variant='primary' 
                className={classes.searchBarButton}
                onClick={handleSubmit}
                >
                    Search
                </Button>
                {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                >
                <MenuItem onClick={() => handleLinkSelect("profile")}>Profile</MenuItem>
                </Menu> */}
            </div>
        </Container>
    )
}

export default SearchBar