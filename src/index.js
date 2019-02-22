import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from'./App'
ReactDOM.render(
    <App> </App>,
    document.getElementById('root')
);
serviceWorker.unregister();
