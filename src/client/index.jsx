import React from 'react';
import { render } from 'react-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

const application = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

render(application, document.getElementById('root'));
