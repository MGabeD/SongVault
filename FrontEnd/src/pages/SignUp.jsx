import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider} from '@material-ui/core'
import {Lock} from '@material-ui/icons'
import React from 'react'

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          SongVault
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const theme = createTheme();

const SignUp = (props) => {

    const validateLogin = () => {
        alert("Need to Validate");
        return true;
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // props.setLoginStatus(true);
        // console.log(props.loginStatus);
        // if (validateLogin()) {
        //   window.location.pathname = '/account'
        // }
        // const email = data.get('email');
        const pass = data.get('password');
        const passRetype = data.get('passwordRetype');

        if (pass !== passRetype) {
            alert("Theyre not the same")
            // Need to move this to validate login
        }
        
        console.log({
          email: data.get('email'),
          password: data.get('password'),
          passwordRetype: data.get('passwordRetype'),
        });
        
      };
    
    return (
        <>
            <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{marginTop: '200px'}}>
            <Lock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordRetype"
              label="Retype Password"
              type="password"
              id="passwordRetype"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <footer style={{minHeight: '23vh'}}>
              
        </footer>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
        </>
    )
}

export default SignUp