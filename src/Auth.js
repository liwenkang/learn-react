import React from 'react';
import {connect} from 'react-redux';
import {login} from './Auth.redux';
import {Redirect} from 'react-router-dom';
// 两个 reducers 每个 reducers 都有一个 state
// 合并 reducer,使用 combineReducers 合并
@connect(
    state => state.auth,
    {login}
)

class Auth extends React.Component {
    render() {
        return (
            <div>
                {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null}
                <h2>你没有权限,需要登陆</h2>
                <button onClick={this.props.login}>登陆</button>
            </div>
        );
    }
}

export default Auth;
