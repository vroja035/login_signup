import { Container, Box, TextField, Grid, Button, Typography, Alert} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/authApiSlice";

import usePersist from '../hooks/usePersist';



const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const [persist, setPersist] = usePersist()

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            setPersist(true)
            const { accessToken } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setEmail('')
            setPassword('')
            navigate('/home')
        } catch (err) {
            if (!err.status) {
                setErrorMsg('No Server Response');
            } else if (err.status === 400) {
                setErrorMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrorMsg('Unauthorized');
            } else {
                setErrorMsg(err.data?.message);
            }
        }
    }

    return(
        <Container component="main" maxWidth="xs">
            
            <Box component="form"
                 onSubmit={handleSubmit}
                 sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',}}
            >
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
                    <Typography component="h1" variant="h4"> Log In </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            label="Email Address"
                            id = "email"
                            type = "email"
                        />
                    </Grid>
        
                    <Grid item xs={12}>
                        <TextField
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            label="Password"
                            id= "password"
                            type="password"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained"> Log In </Button>
                    </Grid>

                    {errorMsg && (
                        <Grid item xs={12}>
                            <Alert severity="error" variant="outlined" >{errorMsg}</Alert>
                        </Grid>
                    )}

                </Grid>

                
                
            </Box>

        </Container>
    );
}

export default LogIn;