import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import App from './App';
import {counter, addGUN, removeGUN, addGUNAsync, removeGUNAsync} from './index.redux';

const store = createStore(counter, applyMiddleware(thunk));

function render() {
    ReactDom.render(<App store={store} addGUN={addGUN} removeGUN={removeGUN} addGUNAsync={addGUNAsync} removeGUNAsync={removeGUNAsync}/>, document.getElementById('root'));
}

render();
// 状态改变之后,手动执行一下更新
store.subscribe(render);
