import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import App from './App';
import {counter} from './index.redux';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(counter,
    compose(
        applyMiddleware(thunk),
        reduxDevtools
    )
);

function App2() {
    return <h2>二营</h2>;
}

function App3() {
    return <h2>三营</h2>;
}

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to="/">一</Link></li>
                    <li><Link to='/2'>二</Link></li>
                    <li><Link to='/3'>三</Link></li>
                </ul>
                {/* exact 表明完全匹配, 默认使用正则匹配 */}
                <Route path="/" exact component={App}/>
                <Route path="/2" component={App2}/>
                <Route path="/3" component={App3}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
