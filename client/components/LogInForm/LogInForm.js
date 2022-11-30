import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LogInForm = () => {

    const btnStyle = {
        background: '#25a244',
        margin: '20px 0',
        padding: 12, 
    }

    return (
        <div className='ml-50'>
            <Paper elevation={20} className='p-20 w-[50%] mt-20 ml-50'>
                <Grid className='mb-10' align='center'>
                    <Avatar className='bg-green-500'><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required className='mb-1.5'/>
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