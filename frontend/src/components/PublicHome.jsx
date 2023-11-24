import { Container, Box, TextField, Grid, Button, Typography, Alert} from "@mui/material";
import { useNavigate } from "react-router-dom";



const PublicHome = () => {
    const navigate = useNavigate();

    return(
        <Container component="main" maxWidth="xs">
            
            <Box 
                 sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',}}
            >
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
                    <Typography component="h1" variant="h5"> This is a simple Log In / Sign Up web app. </Typography>
                    <Typography component="h1" variant="h5"> Made with MERN. </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Button onClick={() => navigate('/login')} fullWidth variant="contained"> Log In </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button onClick={() => navigate('/signup')} fullWidth variant="contained"> Sign Up </Button>
                    </Grid>

                </Grid>

                
                
            </Box>

        </Container>
    );
}

export default PublicHome;