import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './stylesheets/index.scss';
import Main from './components/main';

ReactDOM.render(
  <Router>
    <div className="width-wrapper">
      <Main />
    </div>
  </Router>,
  document.getElementById('root')
);
