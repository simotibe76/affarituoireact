// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Usa il nome corretto, App.jsx
import './styles.css';        // Se hai stili

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

