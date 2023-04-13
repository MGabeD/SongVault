import { Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import SearchBar from '../Components/SearchBar/SearchBar'
import BottomSongControlUI from '../Components/BottomSongControlUI/BottomSongControlUI'

const propPlaylists = [{name: 'playlist1', id: '12398124982'}, {name: 'playlist2', id: '1285830290'}, {name: 'playlist3', id: '1284883593'}]

const Discover = () => {
    const [songs, setSongs] = useState([]);

    return (
        <div style={{background: 'black', minHeight: '80vh'}}>
            <SearchBar songs={songs} setSongs={setSongs}/>
            <div >
                <Typography variant='h3' style={{color: 'white', width: '100%', justifyContent: 'center', display: 'flex'}}>
                    Search Results
                </Typography>
                <Container style={{width: '100%'}}>
                    <Grid container style={{width: '100%', paddingTop: '20px'}} spacing={4}>
                        {songs.map((songInfo) => (
                            <Grid item xs={12} key={songInfo.songId}>
                            <BottomSongControlUI
                            title={songInfo.name}
                            audio={songInfo.mp3Link}
                            image={songInfo.imageLink}
                            id={songInfo.songId}
                            artist={songInfo.artistNames[0]}
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