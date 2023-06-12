import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header'
import Home from './components/Home';

const App = () => {

  return (
    <div>
      <Header></Header>
      <Home></Home>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default App;