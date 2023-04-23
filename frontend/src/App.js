import './App.css';
import React from 'react';
import Header from './Component/Layout/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webfont from 'webfontloader';
import Footer from './Component/Layout/Footer/Footer';
import Home from './Component/Home/Home';
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
      </Routes>

      <Footer />
    </Router>)
}

export default App;
