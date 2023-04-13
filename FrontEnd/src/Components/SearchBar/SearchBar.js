import { Typography, Container, FormGroup, Button, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import {useState} from 'react'

import useStyles from './searchbarStyles'
// import stockPhoto from '../../images/discoverPageBG.jpeg'
import stockPhoto from '../../images/Headphones.avif'


const SearchBar = (props) => {
    const classes = useStyles();

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const getSongInfo = async (id) => {
        const response = await fetch('http://localhost:3001/api/songs/' + id);
        const data = await response.json();

        // alert(JSON.stringify(data));
        return data;
    }

    const handleSubmit = () => {
        const reqSearch = async (params) => {
            
            const response = await fetch('http://localhost:3001/api/discover' + '?' + new URLSearchParams(params));
            const results = await response.json();
    
            console.log(results);
            return results;        
        }

        const params = {userName: searchInput };
        reqSearch(params)
        .then((data) => {
            alert(JSON.stringify(data))
            
            const updatedSongs = [];
            Promise.all(data.songs.map((songID) => {
                return getSongInfo(songID)
                .then((songInfo) => {
                  updatedSongs.push(songInfo);
                })
              }))
              .then(() => {
                props.setSongs(updatedSongs);
              })
        })
        
        console.log(searchInput);
    }

    return (
        <Container className={classes.searchBarOnPhotoContainer}>
            <img src={stockPhoto} style={{position: 'relative', width: '100%'}}/>
            <div className={classes.searchBarButtonContainer}>
                <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} 
                className={classes.searchBarInput}
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