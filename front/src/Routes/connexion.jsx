import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

export default function Connexion() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    await loginUser(email, password);
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la connexion.');
      }

      console.log('Connexion réussie :', data);
      localStorage.setItem('token', data.token);
      alert('Connexion réussie !');
    } catch (error) {
      console.error('Erreur :', error.message);
      alert(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
      padding: { xs: 2, sm: 3 },
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <CssBaseline />
      <Box sx={{ 
        width: '100%',
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        padding: { xs: 2, sm: 3 },
        backgroundColor: 'white',
        borderRadius: { xs: 0, sm: 2 },
        boxShadow: { xs: 0, sm: 3 }
      }}>
        <Avatar sx={{ m: 1, bgcolor: '#1CABE2' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse Email"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#1CABE2' }}>
            Se connecter
          </Button>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Link href="/forgot-password" variant="body2">
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/inscription" variant="body2">
                S'inscrire
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}