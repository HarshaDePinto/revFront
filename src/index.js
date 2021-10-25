import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/swiper/swiper-bundle.min.css';
import '../node_modules/magnific-popup/dist/magnific-popup.css';
import '../node_modules/react-rangeslider/lib/index.css';
import './assets/css/font-awesome.css';
import './assets/css/font/flaticon.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import './assets/css/color4.css'; 

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('SaladFactory')
);

reportWebVitals();
