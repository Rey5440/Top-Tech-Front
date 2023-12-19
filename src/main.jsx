import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import dotenv from 'dotenv';
dotenv.config();

//importrar variables de entorno de para domain y clientId


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider  domain="dev-mxntk40w42hj7fze.us.auth0.com" clientId="R8Si6nJwh5Kv1yPl3FEqWaJDV8hHsPyL">
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
