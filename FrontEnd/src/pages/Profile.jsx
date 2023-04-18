import {React, useState, useEffect} from 'react'
import { Container, Grid, Typography } from '@material-ui/core'

import profilePic from '../images/SomeDude.jpeg'
import SongPlayerUI from '../Components/PlayableSongCardBig/PlayableSongCardBig'
import BottomSongControlUI from '../Components/BottomSongControlUI/BottomSongControlUI'

import song from '../audio/reds.mp3'
import PlayableSongCardSmall from '../Components/PlayableSongCardSmall/PlayableSongCardSmall'
import { ViewColumn } from '@material-ui/icons'

const songProps = {
    title: "Reds",
    artist: "James Becker",
    image: "https://source.unsplash.com/random?music",
    audio: song
}

const songs = [1, 2, 3, 4, 5, 6, 7];

const Profile = () => {
    let [msg, setMsg] = useState("Loading...")
    const [imageSrc, setImageSrc] = useState(null);
    const [audioSrc, setAudioSrc] = useState(null);

    const [audioUrl, setAudioUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const params = {input: "testinginput"}
    //         const result = await fetch('http://localhost:3001/api', );
    //         const data = await result.json()
    //         console.log("response: ", data);
    //         setMsg(data.message);
        
            
    //       };
      
    //       fetchData();
    // },[]);

    // function getUserData() {
    //     // Set the URL to the desired endpoint
    //     const url = 'http://localhost:3001/api/users/642cced92aed756b41eea226';
      
    //     // Make the GET request using fetch()
    //     fetch(url)
    //       .then(response => {
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //       })
    //       .then(data => {
    //         // Handle the response data
    //         console.log('User data:', data);
    //         // Do something with the retrieved data
    //       })
    //       .catch(error => {
    //         // Handle any errors that occurred during the fetch
    //         console.error('Error fetching user data:', error);
    //       });
          
    //       console.log("pulling data");
    //       getUserData();
    //   }

    useEffect(() => {
        // const obj = {
        //     "firstName": "Gabe",
        //     "lastName": "Denton",
        //     "email": "fake@fake.com",
        //     "stageName": "amazingStageName",
        //     "birthday": "6-6-2002",
        //     "bio": "amazing_test_bio"
        // }

        // const fetchData = async(url, params) => {
        //     const response = await fetch(url + '?' + new URLSearchParams(params));
        //     const data = await response.json()

        //     console.log("response: " + data.message);
        //     setMsg(data.message);
        // }

        // fetchData('http://localhost:3001/api', {input: "testing", user: "Gabe D"});
        
        // const fetchData = async () => {
        //     const fileName='fuck this';
        //     const response = await fetch(`/download?fileName=${fileName}`);
        //     console.log(response)
        //     const data = await response.json();
        //     console.log(data)
        //     setImageSrc(data.imageSrc);
        //     setAudioSrc(data.audioSrc);
        //   };
        //   fetchData();

        const fetchImageUrl = async () => {
            const response = await fetch('/download');
            console.log(response);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            console.log(url);
            setImageUrl(url);
        }
        fetchImageUrl();
    }, []);
    return (
        <>
            <Container style={{marginTop: '1vh', height: '90vh', marginLeft: 0, marginRight: 0, padding: 0}}>
                <Typography variant='h2'>
                    Test page (Profile will merge with 'account')
                </Typography>
                <Grid container spacing={0} xs={8}>
                    {songs.map((one) => (
                        <Grid item xs={12} style={{margin: '0.3px'}}>
                            <PlayableSongCardSmall/>
                        </Grid>
                    ))}

                </Grid>
                <button onClick={() => {console.log("hi")}}>
                    Hello
                </button>
                {/* {imageSrc && <img src={imageSrc} alt="song artwork" />}
                {audioSrc && (
                <audio controls>
                    <source src={audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio> */}
                <audio controls src={audioUrl}></audio>
                <img src={"https://firebasestorage.googleapis.com/v0/b/songvault-7f750.appspot.com/o/64378748fdcec13c62d4d113%2FdiscoverPageBG.jpeg?alt=media&token=89894b05-1aad-4b13-9d4d-c2114f3bc52b"} alt="Album cover" />
                )}
                <Typography>
                    {msg}
                </Typography>
                
                {/* <SongPlayerUI/>
                <audio controls title='Song Title'>
                    <source src={song} type="audio/mp3"/>
                    Your browser does not support the audio tag.
                </audio> */}
                <div style={{flexDirection: 'column', display: 'flex', height: '100%', justifyContent: 'flex-end', marginLeft: '0px'}}>
                    <BottomSongControlUI
                    title={songProps.title}
                    artist={songProps.artist}
                    image={songProps.image}
                    audio={songProps.audio}
                    />
                </div>
            </Container>

            
        </>
    )
}

export default Profile