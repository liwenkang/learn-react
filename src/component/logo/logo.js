import React from 'react';

import logoImage from './logo.png'
import './logo.css'

class Logo extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='logo-container'>
                <img src={logoImage} alt="这是一个 github 图标" width={200} height={200}/>
            </div>
        );
    }
}

export default Logo;