import React from 'react';
import { UserProvider } from '../context/UserContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
)}

export default MyApp
