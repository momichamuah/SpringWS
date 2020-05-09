import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, withRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './App.css';

function App() {
  //localStorage.removeItem("loggedInEmployer");
  return (
    <BrowserRouter>
    <Layout />
  </BrowserRouter>
  );
}

export default App;
