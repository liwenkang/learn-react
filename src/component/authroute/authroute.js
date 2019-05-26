import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(
  null,
  {loadData}
)
class AuthRoute extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    // }

    // 1. 当前用户是否登陆?
    // 登录 => 有没有权限访问此页
    // 有权限 => 留下
    // 没权限 => 登陆(提示用户没有权限)
    // 没有登陆 => 跳转到登录页

    // 2. 当前用户是牛人/boss => 跳转到不同的页面

    // 3. 用户注册后是否完善信息,如果没有完善,就跳转到完善信息列表
    // 头像/个人简介
    componentDidMount() {
        // 处理异步

        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if (publicList.includes(pathname)) {
            // 找到了,说明此时不需要获取用户信息
            console.log('找到了');
            return null;
        } else {
            // 没找到,要看下用户有没有登陆
            console.log('继续啊');
        }

        axios.get('user/info')
          .then(response => {
              if (response.status === 200) {
                  if (response.data.code === 0) {
                      // 说明登录了
                      this.props.loadData(response.data.data);
                  } else {
                      // 说明没登录, 跳转到 login
                      this.props.history.push('/login');
                  }
              }
          })
          .catch(errors => {
              console.log(errors);
          });
    }

    render() {
        return null
    }
}

export default AuthRoute;