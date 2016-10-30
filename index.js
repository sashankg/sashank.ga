import "babel-polyfill";

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, Redirect } from 'react-router';

import Portfolio from './app/components/Portfolio';
import Contents from './app/components/Contents';
import ProjectPage from './app/components/ProjectPage';
import Transition from './app/components/Transition'

import configureStore from './app/store/configureStore';

const store = configureStore();

store.runSaga();

render(
    <Provider store={ store }>
        <Router history={ store.syncHistory(browserHistory) }>
            <Route path="/portfolio" component={ Portfolio }>
                <Route path="programming/*" component={ ProjectPage } />
                <Route path="*" component={ Contents } />
            </Route>
            <Redirect from="/" to="/portfolio" />
        </Router>
    </Provider>, 
    document.getElementById('root')
);
