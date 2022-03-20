import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store.js';

import 'bootstrap/dist/css/bootstrap.min.css';

const application = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

render(application, document.getElementById('root'));
