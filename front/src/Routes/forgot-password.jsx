import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";

export default function ForgotPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
    });
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
      <CssBaseline />
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
        <Avatar sx={{ m: 1, bgcolor: '#1CABE2' }}>
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Mot de passe oublié
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, mb: 3, textAlign: 'center' }}>
          Entrez votre adresse email pour recevoir un lien de réinitialisation
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#1CABE2' }}
          >
            Envoyer le lien
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/" variant="body2">
                Retour à la connexion
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
