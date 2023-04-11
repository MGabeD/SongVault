import {React, useEffect, useState} from 'react'

import { Container, Grid, Typography, Button } from '@material-ui/core'
import BottomSongControlUI from '../Components/BottomSongControlUI/BottomSongControlUI'
import song from '../audio/reds.mp3'

const songProps = {
    title: "Reds",
    artist: "James Becker",
    image: "https://source.unsplash.com/random/?Music",
    audio: song
}

const songs = [1, 2, 3, 4, 5, 6, 7]

const Trending = () => {
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

    const selectGenre = () => {
        alert("no")
    }

    return (
        <div style={{backgroundColor: 'black', color: 'black', marginTop: 0}}>
            <Typography variant='h3' style={{color: 'gray' , textAlign:' center', paddingTop: '20px', marginBottom: '5px'}}>
                Trending Today
                {recSongs}
            </Typography>
            <Container style={{padding: '20px', display: 'flex', justifyContent: 'center'}}>
                <Button style={{color: 'white'}} onClick={selectGenre}>
                    Select Genre (fixme)
                </Button>
            </Container>
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
    )
}

export default Trending