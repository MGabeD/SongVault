import { Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import SearchBar from '../Components/SearchBar/SearchBar'
import BottomSongControlUI from '../Components/BottomSongControlUI/BottomSongControlUI'
import song from '../audio/reds.mp3'

const songProps = {
    title: "Reds",
    artist: "James Becker",
    image: "https://source.unsplash.com/random/?Music",
    audio: song
}

const songs = [1, 2, 3, 4, 5, 6, 7]

// https://www.thecodecreative.com/blog/how-to-load-an-audio-file-using-fetch



const Discover = () => {
    return (
        <div style={{background: 'black'}}>
            <SearchBar/>
            <div >
                <Typography variant='h3' style={{color: 'white', width: '100%', justifyContent: 'center', display: 'flex'}}>
                    Search Results
                </Typography>
                <Container style={{width: '100%'}}>
                    <Grid container style={{width: '100%', paddingTop: '20px'}} spacing={4}>
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