import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient'; 
import { AuthProvider } from '../context/authContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
)}

export default MyApp
