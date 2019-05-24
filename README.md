# react 全家桶入门

    使用 react 全家桶配合 ant-design 以及 typescript 开始一个模版


1. 注释的使用
    ```jsx harmony
    class ProductCategoryRow extends React.Component {
        render() {
            // this.props 是什么?
            const category = this.props.category; 
            return (
                // 注释1
                /* 注释2 */
                <tr>
                    {/* important 子元素的注释1 */}
                    <th colSpan="2">
                        {/* 子元素的注释2 */}
                        {category}
                    </th>
                </tr>
            );
        }
    }
    ```

2. 往组件中传值的时候,类似 vue 中的 v-bind(:),在子组件中接受值的时候,用到了 this.props
    ```jsx harmony
    class FilterableProductTable extends React.Component {
        render() {
            return (
                <div>
                    <SearchBar/>
                    {/* 注意此处的 this 指向, 是 FilterableProductTable 组件 */}
                    <ProductTable products={this.props.products}/>
                </div>
            );
        }
    }
    
    ReactDOM.render(
        <FilterableProductTable products={PRODUCTS}/>,
        document.getElementById('root')
    );
    ```

3. state 和 props 的区别?
    ```
    state 代表了随时间会产生变化的数据,应当仅在实现交互时使用。
    state 类似于 vuex 中的 state,不应该直接被修改,而是通过 this.setState({'name': value}), (在 veux 中是通过提交 mutation,在mutation中定义一个方法,通过 commit 调用其中的方法),state 改变之后会自动调用 render
    state 的更新可能是异步的,不要依赖 state 中的值更新一个新的 state
    state 的更新会被合并(保留之前的,只更新重复的)
    一个 state 的值不应该是依赖 props 或者其它 state 计算出
    props 是父组件向子组件传递数据的方式,组件不能修改自己的 props
    ```

4. jsx 中的语法 className, 行内样式的语法, 变量用{}包裹
    ```jsx harmony
    function App() {
      return (
        // 注意这里的 className 代替 class
        // 只能 return 一个元素(vue 的 template 中也只能有一个元素)
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
       
          <tr>
            {/* 注意 style 需要是一个对象, 属性名都转换成了驼峰的写法 */}
            <td style={this.props.product.stocked ? {} : {color: 'red'}}>{this.props.product.name}</td>
            <td>{this.props.product.price}</td>
          </tr>
        </div>
      );
    }
    ```

5. react自定义函数
    ```
    render 是用来做渲染的
    componentDidMount 在 render 之后执行,永远只执行一次(组件再刷新之后不会重新执行)
    componentWillUnmount 在组件移除之后执行,永远只执行一次
    ```
        
6. 提前判断是否要加载组件,不要在 return 之前再做条件判断 

7. input 要有 value ,因为你每次输入的时候,都在刷新 input 这个原生组件

8. 每一个 li 都有一个 key(从而实现数据更新)

9. 利用 express 起一个基础的后台,因为 express 文件修改之后需要重启 node,所以利用nodemon 自动重启 server

10. mongoose 的使用
    ```
    connect 链接数据库
    定义文档模型 Schema/model
    一个数据库文档对应一个模型,通过模型操作数据库
    
    mongoose 文档类型
    String,Number 数据结构
    
    增create
    User.create({
        user: '啦啦啦',
        age: 22
    }, function (err, doc) {
        if (!err) {
            console.log(doc);
        } else {
            console.log(err);
        }
    });
    
    删remove
    const User = mongoose.model('user', new mongoose.Schema({
        user: {type: String, required: true},
        age: {type: Number, required: true}
    }));
    
    User.remove({age: 18}, function (err, doc) {
        console.log(doc)
    })
    
    改update 
    User.update({user: '小黄'}, {'$set': {age: 999}}, function (err, doc) {
        console.log(doc)
    })
    
    查Find/findOne
    {}中可以定义具体条件
    User.find({}, function (err, doc) {
        return res.json(doc);
    });
        
    查找一条数据就返回
    User.findOne({}, function (err, doc) {
        return res.json(doc);
    });
    ```
    
11. react 在使用的时候要重点关注模块的拆分. 对于复杂的组件推荐使用从下到上的构建方式(每次只关注一个小模块的实现), 对于简单的组件,可以从上往下实现

12. 确定 state 的位置
    ```
    1. 找到所有根据 state 渲染的组件
    2. 找到这些组件公有的父组件
    3. 这个父组件应该有这个 state,或者在更高层的父组件上应该有 state
    4. 如果实在找不到的话,就自己新建一个公有的父组件,保存 state
    ```
    
13. super 的使用
    ```jsx harmony
    function XX() {
        this.state = {
            filterText: '',
            inStockOnly: false
        };
    }
    
    class XX extends React.Component () {
        // 构造方法 constructor 就等于上面的构造函数 XX
        // 使用 new 调用 XX 的时候,会自动调用 constructor
        // todo 复习一下 new 的使用,以及原型链 
        constructor(props) {
            // super(), 是用来初始化 constructor 中的 this 的(子类没有自己的this对象, 而是继承父类的this对象)
            // super(props), 用来初始化 constructor 中的 this.props, 调用 React.Component 的 props
            super(props);
            // 保存一份状态
            this.state = {
                filterText: '',
                inStockOnly: false
            };
        }
    }
    ```
    
14. react 可以理解一个函数,简洁的数据驱动 
    ```js
    const react = data => view
    // 所以对于页面数据的筛选,要在渲染之前完成
    ```
    
15. props 传递的是正向数据流,高阶组件(<组件 数据={值}/>)传递给低阶组件(从this.props获取)
    ```
    反向数据流: 低阶组件传递给高阶组件(需要首先在父组件中设置 setState 的方法, 然后传递给低阶组件,在低阶组件中调用高阶组件传来的方法,从而修改保存在高阶组件上的 state 的值)
    ```
    
16. 注意 forEach 中不能用 break 和 continue, 使用 return,会提前结束当前这次循环,并进入下一次循环

17. react 绑定 this 的方法
    ```jsx harmony
    // 参考 https://blog.csdn.net/sinat_17775997/article/details/56839485
    // 官方示例中的绑定方式
    class FilterableProductTable extends Component {
        constructor(props) {
            super(props);
            this.state = {
                filterText: '',
                inStockOnly: false
            };
            // 直接 bind 绑定 this
            this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        }
        
        handleFilterTextChange(filterText) {
            this.setState({
                filterText: filterText
            });
        }
    }    
    
    // 更方便的箭头函数用法
    class FilterableProductTable extends Component {
        constructor(props) {
            super(props);
            this.state = {
                filterText: '',
                inStockOnly: false
            };
        }
        // 利用箭头函数搞定了 this
        handleFilterTextChange = (filterText) => {
            this.setState({
                filterText: filterText
            });
        }
    }
    
    // 在使用的时候 bind 或者改为箭头函数
    class FilterableProductTable extends Component {
        constructor(props) {
            super(props);
            this.state = {
                filterText: '',
                inStockOnly: false
            };
        }
    
        handleFilterTextChange(filterText) {
            this.setState({
                filterText: filterText
            });
        }
        
       render () {
           return (
               <div>
                   <button onClick={ this.handleFilterTextChange.bind(this, '赵四') }>Say Hello</button>
                  <button onClick={ () => this.handleFilterTextChange('赵四') }>Say Hello</button>
               </div>
           )
       }
    }
    ```
    
18. 只要是是想依赖 react 的数组,就要设置 key

19. 如果组件中只有 render 可以把组件写成函数的形式,注意每一个组件都要引入 react
    ```jsx harmony
    function Child(props) {
        return (
            <div>
                <h2>{props.name}</h2>
            </div>
        );
    }
    ```
    
20. JSX 的本质就是 JS, 变量需要 {}

21. React 生命周期
    ```
    初始化周期:页面第一次渲染,所要执行的所有函数
    
    组件重新渲染生命周期: 属性变化,setState导致的页面状态变化
    
    组件卸载生命周期: 组件要离开某个页面了,被删掉,垃圾回收,状态清理
    
      constructor () {
        先初始化
      }  
    
      componentWillMount () {
        将要开始渲染
      }
      
      render () {
        渲染
      }  
      
      componentDidMount() {
        组件已经被渲染到 DOM 中后运行
      }
    
      componentWillUnmount() {
        组件销毁前
      } 
    ```

22. antd-mobile 按需引入,需要配合 babel (babel-plugin-import)

23. redux 
    ```
    和 react 解耦
    单一状态,单向数据流
    核心概念: store, state, action(dispatch), reducer(类似 vuex 中的 getter,是一个处理变化,生成新的 state)
    
    使用步骤:
        利用 reducer 新建 store,通过 store.getState 获取状态
        // 新建 store
        function counter(state = 0, action) {
            switch (action.type) {
                case '加机关枪':
                    return state + 1;
                case '减机关枪':
                    return state - 1;
                default:
                    return 10;
            }
        }
        
        const store = createStore(counter);
        const init = store.getState();
        
        需要状态变更, store.dispatch(action) 修改状态
        store.dispatch({type: '加机关枪'});
        
        reducer 接收 state 和 action ,返回新的 state, 使用 store.subscribe 监听修改
        function listener() {
            const current = store.getState()
            console.log(`现在的机关枪有${current}把`)
        }
        
        store.subscribe(listener)
        
    如何跟 react 一起使用?
        store.dispatch 方法传递给组件,从而让组件内部可以调用修改状态
        subscribe 订阅 render 函数,意味着每次修改,都会进行重新渲染
        redux 的相关内容单独存放
        
    具体步骤:
        在 index.redux.js 中描述相关属性和方法
        在 index.js 中新建一个 store, 将 store,以及一些方法 传给组件
        将这个组件的 render 函数交给 store.subscribe
        在组件中取出 store 和相关方法,从而实现调用
        
    处理异步?
    redux 默认只处理同步,处理异步需要使用 redux-thunk
    applyMiddleware 开启 thunk 中间件
    redux 的 action 只能返回一个对象 {type: 'xxx'}
    开启插件后 action 可以返回一个函数,使用 dispatch 提交 action
    
    调试工具? npm install redux-devtools-extention
    const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    const store = createStore(counter,
        compose(
            applyMiddleware(thunk),
            reduxDevtools
        )
    );
    ```
    
24. react-redux 更优雅的结合 react 和 redux?
    ```
    Provider 在应用最外层,传入 store 即可,只用一次
    Connect 负责从外部获取组件需要的参数, 可以用装饰器的方法写 (配合)
    
    // index.js
    import {Provider} from 'react-redux'
    ReactDom.render(
        <Provider store={store}><App/></Provider>,
        document.getElementById('root')
    );
    // App.js
    import {connect} from 'react-redux';
    import {addGUN, addGUNAsync, removeGUN, removeGUNAsync} from './index.redux';
    // 将属性传入
    const mapStateToProps = (state) => {
        return {num: state};
    };
    // 将方法传入
    const actionCreators = {addGUN, addGUNAsync, removeGUN, removeGUNAsync};
    // 装饰器模式
    App = connect(mapStateToProps, actionCreators)(App);
    // 在安装 babel-plugin-transform-decorators-legacy 后, 配置 babel 的 plugins
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
    // 下面的整个 connect 就相当于上面的一坨
    @connect(
        // 取 state 里的属性放到 props 里
        state => ({num: state}),
        // 取 state 里的方法放到 props 里, 自动 dispatch
        {addGUN, addGUNAsync, removeGUN, removeGUNAsync},
    ```
    
25. redux-route
    ```
    入门组件:
            browserRouter, 包裹整个应用
            Router 路由对应渲染的组件,可嵌套
            Link 跳转
            
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
                    {/* 在 Text 组件里面,就能从 props 中取到一个对象
                        this.props = {
                            history: {length: 13, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}
                            location: {pathname: "/2", search: "", hash: "", state: undefined, key: "7da061"}
                            match: {path: "/:location", url: "/2", isExact: true, params: {…}}
                            staticContext: undefined
                        }
                        从而获取匹配的 url
                        例如在多个用户/任务上作为标识
                        {this.props.match.params.location} 告诉用户,他当前访问的错误的网址是什么!
                    */}
                    <Route path="/:location" component={Text}/>
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
    
    Redirect 的用法?
    
    <Route path="/:location" component={Text}/> 之前的如果有已经命中的,那么我们希望 Text 组件是不渲染的, 这个时候就用到了 Switch (也可以用来做 404 之类的页面 ) 
    
    <Switch>
        {/* Switch 表示只命中第一个 */}
        <Route path="/" component={App}/>
        <Route path="/2" component={App2}/>
        <Route path="/3" component={App3}/>
        <Route path="/:location" component={Test}/>
    </Switch>
    ```

26. redux-route 小实战
    做一个拥有登陆权限的页面
    
    Auth.js 登录相关 redux 的页面
    Dasboard 是登陆的路由
    
    注意 App.js 中 16 行
    ```jsx harmony
    @connect(
        // 取 state 里的属性放到 props 里,虽然 state 就是数字,但是要取 couter 才能取到正确的值
        state => ({num: state.counter}),
    )
    ```
    
26. react-router 中 path 和 url 的区别?
    ```
    path - (string) The path pattern used to match. 
         - Useful for building nested <Route>s
         
    url - (string) The matched portion of the URL. 
        - Useful for building nested <Link>s
        
    观察路由"/users/:userId"
    此例中，match.path的返回值将是 "/users/:userId"。
    而match.url 的返回值将是:userId的值，例如"users/5"。
    ```
    
27. 异步请求
    ```
    同步写在 componentWillMount
    异步写在 componentDidMount, 在 render 之后执行,永远只执行一次(组件再刷新之后不会重新执行)
    注意,render 里的变量,要有初始值,之后才根据异步请求的结果刷新
    
    将异步的请求写在 Auth.redux 文件中,在异步结果返回后,调用一个方法,规定好函数的 type 和 参数值, 最后在统一的一个大函数 auth 中集中处理,注意传入的参数通过 action.payload.user 拿到
    ```
    
28. axios 拦截器
    ```
    import axios from 'axios';
    import {Toast} from 'antd-mobile';
    // 拦截请求
    axios.interceptors.request.use(function (config) {
        Toast.loading('加载中', 0);
        return config;
    });
    
    // 拦截响应
    axios.interceptors.response.use(function (config) {
        setTimeout(() => {
            Toast.hide();
        }, 3000);
        return config;
    });
    ```