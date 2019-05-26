import React from 'react';
import {connect} from 'react-redux';
import {login, getUserData} from './Auth.redux';
import {Redirect} from 'react-router-dom';
// 两个 reducers 每个 reducers 都有一个 state
// 合并 reducer,使用 combineReducers 合并
@connect(
    state => state.auth,
    {login, getUserData}
)

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        // 同步操作
    }

    componentDidMount() {
        // 异步请求
        this.props.getUserData()
    }

    render() {
        return (
            <div>
                名字: {this.props.user}, 年龄: {this.props.age}
                {this.props.isAuth ? <Redirect to='/dashboard'/> : null}
                <h2>你没有权限,需要登陆</h2>
                <button onClick={this.props.login}>登陆</button>
            </div>
        );
    }
}

export default Auth;
