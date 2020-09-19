import React from 'react';
import './Login.css';
// import {
//   Redirect
// } from 'react-router-dom';
import Cookies from 'js-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  componentDidMount() {
    document.title = 'Giriş yap · Veresiye'
  }

  handleLogin(event) {
    event.preventDefault();


    let data = {
      "email": this.state.username,
      "password": this.state.password
    }

    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://localhost:5000/api/user/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        Cookies.set('auth-token', data['auth-token']);
        window.location = '/'
      })
      .catch(err => console.log(err));
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div className='Login'>

        <a className='Login-logo' href='/'>
          <p className='Login-logo-text'>Veresiye</p>
        </a>

        <form className='Login-form'>
          <input className='Login-form-input' type='email' placeholder='E-posta' onChange={this.handleUsername}></input>
          <input className='Login-form-input' type='password' placeholder='Şifre' onChange={this.handlePassword}></input>
          <button className='Login-form-button' type='submit' onClick={this.handleLogin}>Giriş yap</button>
        </form>

        <a className='Login-register' href='/register'>Hesabın yoksa buradan kayıt olabilirsin</a>

      </div>
    );
  }
}

export default Login;