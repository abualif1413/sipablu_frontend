import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Beranda from './Beranda';
import Login from './Pages/Login';
import Cookies from 'universal-cookie/es6';
import AppConstant from './Modules/AppConstant';

const cookies = new Cookies();
const token = cookies.get(AppConstant.APP_COOKIE);

console.log("token", token);

if(token) {
  ReactDOM.render(
      <React.StrictMode>
        <Beranda />
        {/* <Login /> */}
      </React.StrictMode>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      {/* <Beranda /> */}
      <Login />
    </React.StrictMode>,
  document.getElementById('root')
);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
