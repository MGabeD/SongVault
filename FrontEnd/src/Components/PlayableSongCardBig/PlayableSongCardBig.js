import {React, useState} from 'react'
import { CardContent, useTheme, Typography, IconButton, CardMedia, Card } from "@material-ui/core";
import { SkipPrevious, SkipNext, PlayArrow, Pause} from '@material-ui/icons';

import song from '../../audio/reds.mp3'

const songProps = {
    title: "Reds",
    artist: "James Becker",
    audio: song
}

// tutorial: https://www.geeksforgeeks.org/how-to-create-music-player-ui-controls-component-in-reactjs/

const SongPlayerUI = () => {
    const playAudio = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0];
        audioEl.play();
        setIsPlaying(true);
    };

    const pauseAudio = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0];
        audioEl.pause();
        setIsPlaying(false);
    };

    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div style={{}}>
      
      <Card
        style={{
          width: 400,
          display: "flex",
          backgroundColor: "whitesmoke",
          boxShadow: "4px 4px 4px gray",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            style={{
              flex: "1 0 auto",
            }}
          >
            <Typography component="h5" variant="h5">
              {songProps.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {songProps.artist}
            </Typography>
          </CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: 1,
              paddingBottom: 1,
            }}
          >
            <IconButton aria-label="previous">
              {useTheme().direction !== "rtl" ? (
                <SkipPrevious />
              ) : (
                <SkipNext />
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
                {!isPlaying ?
                <PlayArrow
                style={{
                    height: 38,
                    width: 38,
                }}
                onClick={playAudio}
                />
                :
                <Pause
                style={{
                    height: 38,
                    width: 38,
                }}
                onClick={pauseAudio}
                />
                }    
                
            </IconButton>
            <IconButton aria-label="next">
              {useTheme().direction !== "rtl" ? (
                <SkipNext />
              ) : (
                <SkipPrevious />
              )}
            </IconButton>
          </div>
        </div>
        <CardMedia
          style={{ width: 151, }}
          image="https://source.unsplash.com/random"
        />
        <audio className="audio-element">
          <source src={require=(songProps.audio)}>
          </source>
        </audio>
      </Card>
    </div>
    )
}

export default SongPlayerUI