import {React, useEffect, useState} from 'react'

import { Container, Grid, Typography, Button, Select, MenuItem } from '@material-ui/core'
import BottomSongControlUI from '../Components/BottomSongControlUI/BottomSongControlUI'



const Trending = () => {
    // Stores the array of songs to display
    const [songs, setSongs] = useState([]);
    // Stores the selected Genre
    const [genre, setGenre] = useState('None');

    // Async function to get the trending songs for a particular genre
    // params = {genre: ${YourSelectedGenre}}
    // Need to change from json response
    const getTopSongs = async (params) => {
        const backendIP = process.env.REACT_APP_BACKEND_IP;
        const response = await fetch(backendIP + '/api/trending', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const recSongs = await response.json();
        return recSongs;
    }

    const handleGenreChange = (event) => {
        // sets the genre hook (honestly not necissary)
        setGenre(event.target.value);

        // params to send to server
        const params = {genre: genre}

        // call async function to get new trending songs
        getTopSongs(params)
        // .then((data) => {
        //     // setSongs(data)
        // })
    };

    useEffect(() => {
        // None is the default genre for the trending page

        // calls the async function to get the generic trending songs
        getTopSongs()
        .then((data) => {
            // alert(JSON.stringify(data))
            console.log("songs:")
            console.log(data)
            // console.log(data[0])
            setSongs(data.songs)
            console.log(songs)
            // setSongs(data)
        })
    },[]);

    return (
        <div style={{backgroundColor: 'black', color: 'black', marginTop: 0, minHeight: '80vh'}}>
            <Typography variant='h3' style={{color: 'gray' , textAlign:' center', paddingTop: '20px', marginBottom: '5px'}}>
                Trending Today
            </Typography>
            <Container style={{padding: '20px', display: 'flex', justifyContent: 'center'}}>
                <p3 style={{color: 'gray', paddingRight: '10px'}}>
                Sort By Genre: 
                </p3>
                <Select
                    labelId="genre-select"
                    id="genre-select"
                    value={genre === "None" ? "" : genre}
                    label="Slect Genre"
                    onChange={handleGenreChange}
                    style={{color: 'black', backgroundColor: 'white', borderRadius: '10px', paddingLeft: '5px', paddingRight: '3px'}}
                >
                    <MenuItem value={"None"}> None </MenuItem>
                    <MenuItem value={"Rap"}> Rap </MenuItem>
                    <MenuItem value={"Indie"}> Indie </MenuItem>
                    <MenuItem value={"Pop"}>Pop</MenuItem>
                    <MenuItem value={"Rock"}>Rock</MenuItem>
                    <MenuItem value={"HipHop"}>Hip Hop</MenuItem>
                    <MenuItem value={"RnB"}> {"R&B"}</MenuItem>
                </Select>
            </Container>
            <Container style={{width: '100%'}}>
                <Grid container style={{width: '100%'}} spacing={4}>
                    {songs.map((songInfo) => (
                        <Grid item xs={12} key={songInfo.songId}>
                            <BottomSongControlUI
                            title={songInfo.name}
                            artist={songInfo.artistNames[0]}
                            image={songInfo.imageLink}
                            audio={songInfo.mp3Link}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default Trending