import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';

const onRedirectCallback = (redirectResult) => {
  // Manejar lógica personalizada después de la redirección
  console.log(redirectResult);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-mxntk40w42hj7fze.us.auth0.com"
      clientId="R8Si6nJwh5Kv1yPl3FEqWaJDV8hHsPyL"
      onRedirectCallback={onRedirectCallback}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
);
