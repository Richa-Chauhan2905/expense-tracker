import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <App />
    </>
  </React.StrictMode>
);
