import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../utility/hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const REGISTER_USER = gql`
  mutation register($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      email
      token
    }
  }
`

const SignupForm = () => {

  const btnStyle = {
      background: '#25a244',
      margin: '20px 0',
      padding: 12, 
  }

  
  //***** user register by graphql server *****
  const router = useRouter();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("Callback hit");
    registerUser();
  }

  const { onChange, onSubmit, values} = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) { 
      context.login(userData);
      toast("successfully registered!");
      window.setTimeout(() => {
        router.push('/');
      }, 3000)
    }, 
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      registerInput: values
    }
    
  })
  
  //***** user register by firebase auth *****
  // const register = async () => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       registerEmail,
  //       registerPassword,
  //     );
  //     console.log(user);
      
  //     // success alert
  //     toast("successfully registered!");
      
  //     // redirect to login page
  //     window.setTimeout(() => {
  //       router.push('/');
  //     }, 3000)

  //   } catch (error) { 
  //     console.log(error.message); 
  //   }
  // }

    return (
        <div className='flex h-screen'>
            <Paper elevation={20} className='m-auto w-3/6 px-12 py-16'>
                <Grid className='mb-10' align='center'>
                    <Avatar className='bg-green-500 mb-3'>
                        <FlightIcon className='rotate-45' />
                    </Avatar>
                    <h1 className='header text-xl'>Are you ready to travel?</h1>
                </Grid>
                <TextField label='Username' name='username' placeholder='jondoe' type='name' variant="outlined" fullWidth required className='mb-1.5' onChange={onChange} />
                <TextField label='Email' name='email' placeholder='jondoe@gmail.com' type='email' variant="outlined" fullWidth required className='mb-1.5' onChange={onChange} />
                <TextField label='Password' name='password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={onChange} />
                <TextField label='Confirm Password' name='confirmPassword' placeholder='Re-enter password' type='password' variant="outlined" fullWidth required onChange={onChange} />
                <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth onClick={onSubmit}>Sign Up</Button>
                <ToastContainer position="top-center" autoClose={1000} />
            </Paper>
        </div>
    )
}

export default SignupForm