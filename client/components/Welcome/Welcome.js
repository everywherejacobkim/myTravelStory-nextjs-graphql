import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useRouter } from 'next/router';

const Welcome = () => {

    const router = useRouter();

    const logout = async () => {
        await signOut(auth);
        console.log("user sign out");
        router.push('/');
    }

    // const { loginUser, setLoginUser } = useContext(UserContext);
    // console.log(loginUser)

    return (
        <div className='bg-white p-5 mb-5 shadow-xl rounded'>
            <h3 className='title-font text-lg mb-5'>Welcome Back!</h3>
            {/* <h3>{loginUser.email}</h3> */}
            <div className='text-center'>   
                <Button variant="outlined" color="primary" onClick={logout}>Log Out</Button>
            </div>
        </div>  
    )
}

export default Welcome