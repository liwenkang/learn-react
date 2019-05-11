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

4. jsx 中的语法 className, 行内样式的语法
    ```jsx harmony
    function App() {
      return (
        // 注意这里的 className 代替 class
        // 只能 return 一个元素(vue 的 template 中也只能有一个元素)
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
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
    增create 删remove 改update 查Find/findOne
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
            // super(), 是用来初始化 this 的(子类没有自己的this对象, 而是继承父类的this对象)
            // super(props), 用来初始化 this.props, 调用 React.Component 的 props
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
    
15. props 传递的是正向数据流,高阶组件传递给低阶组件
    反向数据流: 低阶组件传递给高阶组件(需要首先在父组件中设置 setState 的方法, 然后传递给低阶组件,在低阶组件中调用高阶组件传来的方法,从而修改保存在高阶组件上的 state 的值)
    
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
    
    // 在使用的时候 bind (这个写法不太推荐)
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
               </div>
           )
       }
    }
    ```
    
18. 只要是是想依赖 react 的数组,就要设置 key

19. 