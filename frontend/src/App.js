
import './App.css';
import React from 'react';
import Header from './Component/Layout/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webfont from 'webfontloader';
import Footer from './Component/Layout/Footer/Footer';
import Home from './Component/Home/Home';
import Loader from './Component/Layout/Loader/Loader';
function App() {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })
  })
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/sad' Component={Loader} />
      </Routes>

      <Footer />
    </Router>)
}

export default App;
