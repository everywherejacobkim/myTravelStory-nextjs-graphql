import React from 'react';
import { UserProvider } from '../context/UserContext';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient'
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
)}

export default MyApp
