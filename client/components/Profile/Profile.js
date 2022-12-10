import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Profile = () => {

    // const { loginUser, setLoginUser } = useContext(UserContext);
    // console.log(loginUser)

    return (
        <div className='bg-white p-5 mb-5 shadow-xl rounded'>
            <h3 className='text-lg mb-5'>Bon journey </h3>
            {/* <h3>{loginUser.email}</h3> */}
        </div>  
    )
}

export default Profile