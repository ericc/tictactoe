import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';

import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

const provider = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(provider, document.getElementById('root'));
registerServiceWorker();
