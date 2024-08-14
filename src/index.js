import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Create a root element where the React application will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
