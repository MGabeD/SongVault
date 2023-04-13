import {React, useEffect, useState} from 'react'

import { Container, Grid, Typography, Button, Select, MenuItem } from '@material-ui/core'
import BottomSongControlUI from '../Components/BottomSongControlUI/BottomSongControlUI'
import song from '../audio/reds.mp3'

const songProps = {
    title: "Reds",
    artist: "Some Dude",
    image: "https://source.unsplash.com/random/?Music",
    audio: song
}



const Trending = () => {
    // Stores the array of songs to display
    const [songs, setSongs] = useState([]);
    // Stores the selected Genre
    const [genre, setGenre] = useState('None');

    // Async function to get the trending songs for a particular genre
    // params = {genre: ${YourSelectedGenre}}
    // Need to change from json response
    const getTopSongs = async (params) => {
        const response = await fetch('http://localhost:3001/trending');
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
        .then((data) => {
            console.log(data.trending);
            setSongs(data.trending)
        })
    };

    const getSongInfo = async (id) => {
        const response = await fetch('http://localhost:3001/api/songs/' + id);
        const data = await response.json();

        // alert(JSON.stringify(data));
        return data;
    }

    useEffect(() => {
        // None is the default genre for the trending page
        const params = {genre: "None"}

        // calls the async function to get the generic trending songs
        getTopSongs(params)
        .then((data) => {
            // alert(data.trending);
            setSongs(data.trending)
            // const updatedSongs = [];
            // Promise.all(data.songs.map((songID) => {
            //     return getSongInfo(songID)
            //     .then((songInfo) => {
            //       updatedSongs.push(songInfo);
            //     })
            // }))
            
            // .then(() => {
            //     alert(updatedSongs)
            //     setSongs(updatedSongs);
            // })
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
                        title={songProps.title}
                        artist={songProps.artist}
                        image={songProps.image}
                        audio={songProps.audio}

                        // title={songInfo.name}
                        // desc={""}
                        // audio={songInfo.mp3Link}
                        // image={songInfo.imageLink}
                        // id={songInfo.songId}
                        />
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default Trending