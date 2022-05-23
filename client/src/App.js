import logo from './logo.svg';
import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { Hello } from './pages/Hello'
import { HomePage } from './pages/HomePage/HomePage';

// Graphql API endpoint created
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create middleware with JWT auth header
const authLink = setContext((_, { headers }) => {
  // find the token information from localstorage if it exists
  const token = localStorage.getItem('id_token');
  // returning the headers 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
