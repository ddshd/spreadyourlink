import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TagManager from "react-gtm-module";
import {GTM_ID, GA_ID} from "./other/variables";
import ReactGA from 'react-ga';

ReactGA.initialize(GA_ID);
ReactGA.pageview(window.location.pathname + window.location.hash);

const tagManagerArgs = {
    gtmId: GTM_ID
};
TagManager.initialize(tagManagerArgs)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
