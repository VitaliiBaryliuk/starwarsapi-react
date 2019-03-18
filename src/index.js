import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <BrowserRouter basename={process.env.ROOT_PATH}>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);

serviceWorker.unregister();
