import React from 'react';
import './styles/index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// createRoot from react-dom/client
import { createRoot } from 'react-dom/client';

// createRoot from react-dom/client
createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);
