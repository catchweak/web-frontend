import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/header.css';
import './styles/navigation.css';
import './styles/main-content.css';
import './styles/components.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
