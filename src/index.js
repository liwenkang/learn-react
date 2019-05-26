import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/register/register';
import reducers from './reducer.js';
import './axios.config';
import AuthRoute from './component/authroute/authroute';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
));

function Boss() {
    return <h2>BOSS页面</h2>
}

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {/* 跳转到某个路由之前,先做检测 */}
                <AuthRoute/>
                <Route path='/boss' component={Boss}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
