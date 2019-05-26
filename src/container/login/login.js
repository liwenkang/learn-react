import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {login} from '../../redux/user.redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

@connect(
  state => state.user,
  {login}
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: ''
    };
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // 这个函数不需要绑定 this(因为在调用的时候, 因为有参数输入,所以使用的都是箭头函数)
  handlerChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  handleLogin() {
    this.props.login(this.state);
  }

  register() {
    // 和路由直接绑定的组件,可以使用 props 上的 history 直接跳转
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : ''}
            <InputItem
              onChange={user => this.handlerChange('user', user)}
            >用户名</InputItem>
            <InputItem
              type='password'
              onChange={pwd => this.handlerChange('pwd', pwd)}
            >密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handleLogin}>登陆</Button>
          <WhiteSpace/>
          <Button type='primary' onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;