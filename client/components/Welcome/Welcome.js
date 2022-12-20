import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';

const Welcome = () => {
    const router = useRouter();

    const { user, logout } = useContext(AuthContext);

    const signOut = () => {
        logout();
        console.log("user sign out");
        router.push('/');
    }

    const goToCreate = () => {
        router.push('/new-story');
    }


    return (
        <div className='bg-white p-5 mb-5 shadow-xl rounded'>
            <h3 className='title-font text-lg mb-5'>Welcome Back!</h3>
            <div className='text-center'>      
            <div className='mb-5'>
                <Button variant="text" size='large' startIcon={<CreateIcon />} onClick={goToCreate}>Create your story</Button>
            </div>
            <div>   
                <Button variant="outlined" color="error" onClick={signOut}>Log Out</Button>
            </div>
            </div>     
        </div>              
    )
}

export default Welcome