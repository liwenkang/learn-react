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

        state 代表了随时间会产生变化的数据,应当仅在实现交互时使用。
        state 类似于 vuex 中的 state,不应该直接被修改,而是通过 this.setState({'name': value}), (在 veux 中是通过提交 mutation,在mutation中定义一个方法,通过 commit 调用其中的方法),state 改变之后会自动调用 render
        state 的更新可能是异步的,不要依赖 state 中的值更新一个新的 state
        state 的更新会被合并(保留之前的,只更新重复的)
        一个 state 的值不应该是依赖 props 或者其它 state 计算出的
        props 是父组件向子组件传递数据的方式,组件不能修改自己的 props

4. jsx 中的语法
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
        </div>
      );
    }
    ```

5. react自定义函数

        render 是用来做渲染的
        componentDidMount 在 render 之后执行,永远只执行一次(组件再刷新之后不会重新执行)
        componentWillUnmount 在组件移除之后执行,永远只执行一次

6. 提前判断是否要加载组件,不要在 return 之前再做条件判断 

7. input 要有 value ,因为你每次输入的时候,都在刷新 input 这个原生组件

8. 每一个 li 都有一个 key(从而实现数据更新)
