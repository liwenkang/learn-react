import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import reducers from './reducer.js';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './axios.config'

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
));
console.log('store', store.getState())
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            {/**
             * 登陆
             *   没有登录信息 => 跳转到 Login
             * 页面 (导航+显示+注销)
             *   一营
             *   二营
             *   骑兵连
             * */}
            <Switch>
                {/* Switch 表示只命中第一个 */}
                {/* exact 表明完全匹配, 默认使用正则匹配 */}
                <Route path="/login" exact component={Auth}/>
                <Route path="/dashboard" component={Dashboard}/>
                {/* 前两个都没有命中 */}
                <Redirect to="/dashboard" component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
