import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/index.js';
import 'font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
