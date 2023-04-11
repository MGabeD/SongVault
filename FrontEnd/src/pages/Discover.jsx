import { Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import SearchBar from '../Components/SearchBar/SearchBar'
import BottomSongControlUI from '../Components/BottomSongControlUI/BottomSongControlUI'
import song from '../audio/reds.mp3'

const songProps = {
    title: "Reds",
    artist: "James Becker",
    image: "https://source.unsplash.com/random",
    audio: song
}


// https://www.thecodecreative.com/blog/how-to-load-an-audio-file-using-fetch

const songs = [1, 2, 3, 4, 5, 6, 7]

const Discover = () => {
    const [recSongs, setRecSongs] = useState([]);

    useEffect(() => {
        const getRecSongs = async () => {
            const response = await fetch('http://localhost:3001/trending');
            const recSongs = await response.json();

            setRecSongs(recSongs.recSongs);
            return recSongs;
        }

        getRecSongs()
        .then((data) => {
            console.log(data.trending);
            alert(data.trending)
        })
    },[]);

    return (
        <div style={{background: 'black'}}>
            <SearchBar/>
            <div>
                <Typography variant='h3' style={{color: 'gray' , textAlign:' center', marginTop: '20px', marginBottom: '5px'}}>
                    Trending Today
                    {recSongs}
                </Typography>
                <Container style={{width: '100%'}}>
                    <Grid container style={{width: '100%'}} spacing={4}>
                        {songs.map((key) => (
                            <Grid item xs={12} key={key}>
                            <BottomSongControlUI
                            title={songProps.title}
                            artist={songProps.artist}
                            image={songProps.image}
                            audio={songProps.audio}
                            />
                        </Grid>
                        ))}
                    </Grid>
                </Container>
                
            </div>
        </div>
    )
}

export default Discover