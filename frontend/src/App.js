import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage'; // Your "Find a Pet" component
import Home from './components/Home'; // Your Home component
import About from './components/About'; // Your About component

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Define your routes using <Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/find-a-pet" element={<MainPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;