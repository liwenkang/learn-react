import axios from 'axios';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USER_DATA = 'USER_DATA';

const initState = {
    isAuth: false,
    user: '李文康',
    age: 23
};

// 定义两个 reducer
export function auth(state = initState, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true};
        case LOGOUT:
            return {...state, isAuth: false};
        case USER_DATA:
            // return {...state, ...action.payload};
            return {...state, user: action.payload.user};
        default:
            return state;
    }
}

// action creator 
export function login() {
    return {
        type: LOGIN
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}

export function getUserData() {
    // dispath 通知数据修改
    return dispatch => {
        axios.get('user')
            .then(response => {
                if (response.status === 200) {
                    dispatch(userData(response.data));
                }
                console.log('this.state', this.state);
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function userData(data) {
    return {
        type: USER_DATA,
        payload: data
    };
}