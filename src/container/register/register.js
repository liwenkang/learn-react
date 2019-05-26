import React from 'react';
import Logo from '../../component/logo/logo';
import {List, Radio, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import './register.css';
import {Redirect} from 'react-router-dom'

@connect(
  state => state.user,
  {register}
)
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      repeatPwd: '',
      type: 'genius' // boss
    };
    this.handlerRegister = this.handlerRegister.bind(this);
  }

  // 这个函数不需要绑定 this(因为在调用的时候, 因为有参数输入,所以使用的都是箭头函数)
  handlerChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  handlerRegister() {
    this.props.register(this.state);
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <h2>注册</h2>
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
            <InputItem
              type='password'
              onChange={repeatPwd => this.handlerChange('repeatPwd', repeatPwd)}
            >确认密码</InputItem>
          </List>
          <WhiteSpace/>
          <List>
            <RadioItem
              checked={this.state.type === 'genius'}
              onChange={() => this.handlerChange('type', 'genius')}
            >牛人</RadioItem>
            <RadioItem
              checked={this.state.type === 'boss'}
              onChange={() => this.handlerChange('type', 'boss')}
            >BOSS</RadioItem>
          </List>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handlerRegister}>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;