import React from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import App from './App';
import {logout} from './Auth.redux';

function two() {
    return <h2>二营</h2>;
}

function three() {
    return <h2>三营</h2>;
}

// 在这里拿到是否登陆的状态,以及 logout 的方法
@connect(
    state => state.auth,
    {logout}
)
class Dashboard extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // 在这里就可以获得 authroute 和 logout
    //
    // }

    render() {
        const redirectToLogin = <Redirect to='/login'/>;
        const match = this.props.match;
        console.log(match);
        const app = (
            <div>
                {this.props.isAuth ? <button onClick={this.props.logout}>点击注销</button> : null}
                <ul>
                    <li>
                        <Link to={`${match.url}`}>一营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/2`}>二营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/3`}>三营</Link>
                    </li>
                </ul>
                <Route path={`${match.url}`} exact component={App}/>
                <Route path={`${match.url}/2`} component={two}/>
                <Route path={`${match.url}/3`} component={three}/>
            </div>
        );
        return this.props.isAuth ? app : redirectToLogin;
    }
}

export default Dashboard;
