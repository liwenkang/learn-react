import axios from 'axios';
import {getRedirectPath} from '../util';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  // 跳转到哪个地方?
  redirectTo: '',
  isAuth: false,
  // 存放报错信息
  msg: '',
  user: '',
  type: ''
};

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, redirectTo: getRedirectPath(action.payload), msg: '', isAuth: true, ...action.payload};
    case ERROR_MSG:
      return {...state, msg: action.msg, isAuth: false};
    case LOGIN_SUCCESS:
      return {...state, redirectTo: getRedirectPath(action.payload), msg: '', isAuth: true, ...action.payload};
    case LOAD_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

function errorMsg(msg) {
  return {
    type: ERROR_MSG,
    msg: msg
  };
}

function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    // 取值的时候用 action.payload
    payload: data
    // 也可以直接写成 data, 取值的时候用 action.data
  };
}

export function register({user, pwd, repeatPwd, type}) {
  // 同步
  if (!user || !pwd || !repeatPwd) {
    return errorMsg('用户名和密码必须输入');
  }

  if (pwd !== repeatPwd) {
    return errorMsg('密码和确认密码不同');
  }

  // 异步, redux-thunk 支持返回函数的写法
  return dispatch => {
    axios.post('user/register', {user, pwd, repeatPwd, type})
      .then(response => {
        if (response.status === 200 && response.data.code === 0) {
          // 请求成功,
          dispatch(registerSuccess({user, pwd, repeatPwd, type}));
        } else {
          dispatch(errorMsg(response.data.msg));
        }
      })
      .catch(errors => {
        console.log(errors);
      });
  };
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    // 取值的时候用 action.payload
    payload: data
    // 也可以直接写成 data, 取值的时候用 action.data
  };
}

export function loadData(user) {
  return {
    type: LOAD_DATA,
    msg: user
  };
}

export function login({user, pwd}) {
  // 验证
  if (!user || !pwd) {
    return errorMsg('用户名和密码必须输入!');
  }

  // 异步, redux-thunk 支持返回函数的写法
  return dispatch => {
    axios.post('user/login', {user, pwd})
      .then(response => {
        console.log('response', response);
        if (response.status === 200 && response.data.code === 0) {
          // 请求成功,
          dispatch(loginSuccess(response.data));
        } else {
          dispatch(errorMsg(response.data.msg));
        }
      })
      .catch(errors => {
        console.log(errors);
      });
  };
}