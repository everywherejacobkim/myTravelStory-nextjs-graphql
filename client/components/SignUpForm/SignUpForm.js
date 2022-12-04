import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';

const SignupForm = () => {

  const btnStyle = {
      background: '#25a244',
      margin: '20px 0',
      padding: 12, 
  }

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) { 
      console.log(error.message); 
    }
    }

    return (
        <div className='flex h-screen'>
            <Paper elevation={20} className='m-auto w-3/6 px-12 py-16'>
                <Grid className='mb-10' align='center'>
                    <Avatar className='bg-green-500 mb-3'>
                        <FlightIcon className='rotate-45' />
                    </Avatar>
                    <h1 className='header text-xl'>Are you ready to travel?</h1>
                </Grid>
                <TextField label='First Name' placeholder='Enter your first name' type='name' variant="outlined" fullWidth required className='mb-1.5'/>
                <TextField label='Last Name' placeholder='Enter your last name' type='name' variant="outlined" fullWidth required className='mb-1.5'/>
                <TextField label='Email' placeholder='Enter email' type='email' variant="outlined" fullWidth required className='mb-1.5' onChange={(e) =>{setRegisterEmail(e.target.value)}}/>
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={(e) =>{setRegisterPassword(e.target.value)}}/>
                <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth onClick={register}>Sign Up</Button>
            </Paper>
        </div>
    )
}

export default SignupForm