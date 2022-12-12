import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useRouter } from 'next/router';
import CreateIcon from '@mui/icons-material/Create';

const Welcome = () => {

    const router = useRouter();

    const logout = async () => {
        await signOut(auth);
        console.log("user sign out");
        router.push('/');
    }

    const goToCreate = () => {
        router.push('/new-story');
    }

    // const { loginUser, setLoginUser } = useContext(UserContext);
    // console.log(loginUser)

    return (
        <div className='bg-white p-5 mb-5 shadow-xl rounded'>
            <h3 className='title-font text-lg mb-5'>Welcome Back!</h3>
            <div className='text-center'>      
            <div className='mb-5'>
                <Button variant="text" size='large' startIcon={<CreateIcon />} onClick={goToCreate}>Create your story</Button>
            </div>
            <div    >   
                <Button variant="outlined" color="error" onClick={logout}>Log Out</Button>
            </div>
            </div>     
        </div>              
    )
}

export default Welcome