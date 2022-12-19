import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {

  const btnStyle = {
      background: '#25a244',
      margin: '20px 0',
      padding: 12, 
  }

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const router = useRouter();

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
      console.log(user);
      
      // success alert
      toast("successfully registered!");
      
      // redirect to login page
      window.setTimeout(() => {
        router.push('/');
      }, 3000)

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
                <TextField label='Email' placeholder='jondoe@gmail.com' type='email' variant="outlined" fullWidth required className='mb-1.5' onChange={(e) => {setRegisterEmail(e.target.value)}} />
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={(e) => {setRegisterPassword(e.target.value)}} />
                <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth onClick={register}>Sign Up</Button>
                <ToastContainer position="top-center" autoClose={1000} />
            </Paper>
        </div>
    )
}

export default SignupForm