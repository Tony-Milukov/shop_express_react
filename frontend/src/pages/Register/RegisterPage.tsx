import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IRegisterRequest from '../../types/registerRequest';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMsg from '../../components/ErrorMsg';
import regExp from './regExp';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

interface IRegErrors {
  emailErr: string | boolean,
  usernameErr: string | boolean,
  passwordErr: string | boolean
}

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState<IRegErrors>({
    emailErr: false,
    usernameErr: false,
    passwordErr: false
  });
  const nav = useNavigate();

  const register = async () => {
    try {
      setErrors({
        ...errors,
        passwordErr: repeatPassword !== password ? `passwords dont match` : !regExp.password.test(password) ? 'Invalid password.' : false,
        usernameErr: !regExp.username.test(username) ? 'Usernames can contain only letters & underscores & nums' : false,
        emailErr: !regExp.email.test(email) ? 'email must in format email@host.host' : false
      });
      if (password && username && email && !errors.emailErr && !errors.passwordErr && !errors.usernameErr) {
        console.log(!errors.passwordErr);
        const res = await axios.put<IRegisterRequest>(`http://localhost:5000/api/user/register`, {
          email,
          password,
          username
        });
        if(res.status  === 200) {
          nav("/login")
        }
      }

    } catch (e: any) {
      const { message } = e.response.data;
      setErrors({
        ...errors,
        usernameErr: message.includes('username') ? message : false,
        emailErr: message.includes('email') ? message : false
      });
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
            Register
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e: any) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              type={"email"}
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <ErrorMsg message={errors.emailErr} condition={!!errors.emailErr}/>

            <TextField
              onChange={(e: any) => setUsername(e.target.value)}
              margin="normal"
              fullWidth
              label="name"
              autoComplete="off"
            />

            <ErrorMsg message={errors.usernameErr} condition={!!errors.usernameErr}/>
            <TextField
              onChange={(e: any) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"

            />
            <TextField
              onChange={(e: any) => setRepeatPassword(e.target.value)}
              margin="normal"
              fullWidth
              name="repeatPassord"
              type="password"
              autoComplete="new-password"
              label="repeat password"
            />

            <ErrorMsg message={errors.passwordErr} condition={!!errors.passwordErr}/>
            <Button
              onClick={register}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <div className="loginBottom"><Link to={'/login'}>Login</Link></div>

      </Container>
    </ThemeProvider>
  );
}
