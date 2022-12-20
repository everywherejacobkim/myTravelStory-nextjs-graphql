import React, { useState, useContext } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../utility/hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';


const LOGIN_USER = gql`
    mutation login($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
        username
        email
        token       
    }
  }
`

const LoginForm = () => {

    const btnStyle = {
        background: '#25a244',
        margin: '20px 0',
        padding: 12, 
    }

    const router = useRouter();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    function loginUserCallback() {
        loginUser();
    }
    
    const { onChange, onSubmit, values} = useForm(loginUserCallback, {
        email: "",
        password: "",
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData } }) { 
          context.login(userData);
          router.push('/home');
        }, 
        onError({ graphQLErrors }) {
          setErrors(graphQLErrors);
        },
        variables: {
          loginInput: values
        }
      })


    return (
        <div className='flex h-screen'>
            <Paper elevation={20} className='m-auto px-12 py-16'>
                <Grid className='mb-10' align='center'>
                    <Avatar className='bg-green-500 mb-3'>
                        <FlightIcon className='rotate-45' />
                    </Avatar>
                    <h1 className='header text-xl'>Are you ready to travel?</h1>
                </Grid>
                <TextField label='Email' name='email' placeholder='Enter email' type='email' variant="outlined" fullWidth required className='mb-1.5' onChange={onChange} />
                <TextField label='Password' name='password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={onChange} />
                <Button onClick={onSubmit} type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>Login</Button>
                <Typography className='mr-10'> Create account?
                    <Link href="/signup" underline='none'>
                        &nbsp;Click here 
                    </Link>
                </Typography>
            </Paper>
        </div>
    )
}

export default LoginForm