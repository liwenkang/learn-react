import React from 'react';

class App extends React.Component {
    render() {
        const store = this.props.store;
        const num = store.getState();
        const addGUN = this.props.addGUN;
        const addGUNAsync = this.props.addGUNAsync;
        const removeGUN = this.props.removeGUN;
        const removeGUNAsync = this.props.removeGUNAsync;
        return (
            <div>
                <h1>现在有机枪{num}把</h1>
                <button onClick={() => store.dispatch(addGUN())}>增加一把</button>
                <button onClick={() => store.dispatch(addGUNAsync())}>增加一把</button>
                <button onClick={() => store.dispatch(removeGUN())}>减少一把</button>
                <button onClick={() => store.dispatch(removeGUNAsync())}>减少一把</button>
            </div>
        );
    }
}

export default App;