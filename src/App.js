import React from 'react';
import {connect} from 'react-redux';
import {addGUN, addGUNAsync, removeGUN, removeGUNAsync} from './index.redux';


// 装饰器模式
// const mapStateToProps = (state) => {
//     return {num: state};
// };
// const actionCreators = {addGUN, addGUNAsync, removeGUN, removeGUNAsync};
// App = connect(mapStateToProps, actionCreators)(App);
// @connect(mapStateToProps, actionCreators) 等价于上面一行


// 下面的整个 connect 就相当于上面的一坨
@connect(
    // 取 state 里的属性放到 props 里
    state => ({num: state}),
    // 取 state 里的方法放到 props 里, 自动 dispatch
    {addGUN, addGUNAsync, removeGUN, removeGUNAsync},
)

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <button onClick={this.props.addGUN}>增加一把</button>
                <button onClick={this.props.addGUNAsync}>增加一把</button>
                <button onClick={this.props.removeGUN}>减少一把</button>
                <button onClick={this.props.removeGUNAsync}>减少一把</button>
            </div>
        );
    }
}

export default App;