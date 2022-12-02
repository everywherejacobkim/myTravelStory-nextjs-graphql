import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';

const LogInForm = () => {

    const btnStyle = {
        background: '#25a244',
        margin: '20px 0',
        padding: 12, 
    }

    return (
        <div className='flex h-screen'>
            <Paper elevation={20} className='m-auto px-12 py-16'>
                <Grid className='mb-10' align='center'>
                    <Avatar className='bg-green-500 mb-3'>
                        <FlightIcon className='rotate-45' />
                    </Avatar>
                    <h1 className='header text-xl'>Are you ready to travel?</h1>
                </Grid>
                <TextField label='Email' placeholder='Enter email' type='email' variant="outlined" fullWidth required className='mb-1.5'/>
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>Sign in</Button>
                <Typography className='mr-10'> Create account?
                    <Link href="#" underline='none'>
                        &nbsp;Click here 
                    </Link>
                </Typography>
            </Paper>
        </div>
    )
}

export default LogInForm