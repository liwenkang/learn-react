# boss 项目文档

### 文件结构

    component 通用组件
    container 页面

## 用户登陆功能

用户验证基于 cookie 实现
express 需要依赖 cookie-parser
用户登录后,服务器端给客户端一个cookie,用来做权限的管理

流程图
```
                 带着cookie向后端获取用户信息                    已登录 
用户加载某个页面  ----------------------------->   用户加载页面 -------> App页面内部 <------╮
                                                           |                          |   
                                                           |  未登录           登录成功 |
                                                           ╰--------> 登陆页面 --------╯ 
    
```

时时刻刻都在做代码拆分

在 componentDidMount,默认是拿不到 this.props.history 的
需要引用 react-router-dom 中的 withRouter 写在 class 前面

在 authroute 里做权限跳转时,有个问题就是,用户可以看到 boss 界面闪一下,然后又跳转到 login 页面了






