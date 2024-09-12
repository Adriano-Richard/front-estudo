import { Avatar, Box, Button, Card, CardContent, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Paper, TextField, Theme, Typography } from "@mui/material";
import React from "react";


const Cadastro: React.FC = () => {

return (
    <Box 
      width="100%" 
      height="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
          <Card>
            <CardContent>
                {/* Conteúdo do formulário de cadastro */}
                <div >
                    <Avatar >
                    
                    </Avatar>
                    <Typography component="h1" variant="h5" mb={2}>
                    Cadastro
                    </Typography>
                    <form  noValidate>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nome"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Sobrenome"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Cadastrar
                    </Button>
                    <Grid container justifyContent="flex-end" mt={2}>
                        <Grid item>
                        <Link href="./login" variant="body2">
                            Já possui uma conta? Faça login!
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cadastro;
