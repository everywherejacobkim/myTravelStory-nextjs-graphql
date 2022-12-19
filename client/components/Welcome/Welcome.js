import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import {  getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import CreateIcon from '@mui/icons-material/Create';
import { useAuthState } from "react-firebase-hooks/auth";
import axios from 'axios';

const Welcome = () => {
    const router = useRouter();
    const auth = getAuth();

    const [user, loading] = useAuthState(auth);

    const logout = async () => {
        await signOut(auth);
        console.log("user sign out");
        router.push('/');
    }

    const goToCreate = () => {
        userValidation();
        router.push('/new-story');
    }

    const userValidation = async () => {
        // Get token from firebase
        const token = await user.getIdToken();
        console.log(token);

        // Send to server for validation
        const res = await axios.get('https://nkim24.wmdd4950.com/graphql/verify', {
            headers: {
                Authorization: "Bearer" + token,
            },
        });
        console.log(res.data)
    }  


    return (
        <div className='bg-white p-5 mb-5 shadow-xl rounded'>
            <h3 className='title-font text-lg mb-5'>Welcome Back!</h3>
            <div className='text-center'>      
            <div className='mb-5'>
                <Button variant="text" size='large' startIcon={<CreateIcon />} onClick={goToCreate}>Create your story</Button>
            </div>
            <div>   
                <Button variant="outlined" color="error" onClick={logout}>Log Out</Button>
            </div>
            </div>     
        </div>              
    )
}

export default Welcome