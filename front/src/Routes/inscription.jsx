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

export default function Inscription() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      name: data.get("lastName"),
      surname: data.get("firstName"),
      password: data.get("password"),
      email: data.get("email"),
      phone: data.get("phone"),
      city: data.get("city")
    };

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'inscription.");
      }

      alert("Inscription réussie !");
      window.location.href = '/'; 
    } catch (error) {
      console.error("Erreur :", error.message);
      alert(error.message);
    }
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        padding: { xs: 2, sm: 3 },
        minHeight: "100vh",
        width: "100vw", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/img/unicef.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: { xs: 2, sm: 3 },
          backgroundColor: "rgba(255, 255, 255, 0.9)", 
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CssBaseline />
        <Avatar sx={{ m: 1, bgcolor: '#1CABE2' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Nom"
            name="lastName"
            autoComplete="family-name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Prénom"
            name="firstName"
            autoComplete="given-name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            label="Ville"
            name="city"
            autoComplete="address-level2"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Téléphone"
            name="phone"
            autoComplete="tel"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse Email"
            name="email"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
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
            autoComplete="new-password"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirmer le mot de passe"
            type="password"
            id="confirm-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#1CABE2' }}>
            S'inscrire
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Déjà un compte ? Se connecter
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
