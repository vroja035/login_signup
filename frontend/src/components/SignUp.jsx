import { Container, Box, TextField, Grid, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useSignupMutation} from "../slices/authApiSlice";

import usePersist from '../hooks/usePersist';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signup, { isLoading }] = useSignupMutation();

    const [persist, setPersist] = usePersist()


    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            setPersist(true)
            const { accessToken } = await signup({ email, username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setEmail('')
            setPassword('')
            navigate('/')
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
                    <Typography component="h1" variant="h4"> Create an account </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            label="Email Address"
                            type = "email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={e => setUsername(e.target.value)}
                            fullWidth
                            label="Username"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            label="Password"
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={e => setConfirmPassword(e.target.value)}
                            fullWidth
                            label="Confirm Password"
                            type="password"
                        />
                    </Grid>
                </Grid>

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Register </Button>
                
            </Box>
        </Container>
    );
}

export default SignUp;