import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userStore from '../../store/userStore';
import { useState } from 'react';
import axios from 'axios';
import './login.css';
import LoginRequest from '../../types/loginRequest';

const theme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();
  const saveToken = userStore((state: any) => state.saveToken);
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [error, setError] = useState<Boolean | String>(false);

  const login = async () => {
    try {
      const { data } = await axios.post<LoginRequest>(`http://localhost:5000/api/user/login`, {
        email,
        password
      });
      saveToken(data.token);
      navigate('/');
      setError(false);
    } catch (e: any) {
      if (e.response.status === 404) {
        setError('email or password are incorrect');
      } else {
        setError('Network Error');
      }
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box>
            <TextField
              onChange={(e: any) => setEmail(e.target.value)}
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
              onChange={(e: any) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              onClick={login}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2
              }}
            >
              Login
            </Button>
            <div className="loginBottom">
              {error ? <span className={'errorMSG'}>email or password are incorrect</span> : null}
              <br/>
              <Link to={'/register'}>
                {'register'}
              </Link>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
