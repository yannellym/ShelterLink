import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage'; 
import Home from './components/Home'; 
import About from './components/About';
import Resources from './components/Resources'; 
import Favorites from './components/Favorites';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(true);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Define your routes using <Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/find-a-pet" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
  
      <Footer />
    </BrowserRouter>
  );
};

export default App;
