import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Import createRoot from react-dom/client
import { createRoot } from 'react-dom/client';

// Use createRoot from react-dom/client
createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);
