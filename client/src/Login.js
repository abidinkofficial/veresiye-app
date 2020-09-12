import React from 'react';
import './Login.css';

class Login extends React.Component {

  componentDidMount() {
    document.title = 'Kayıt ol · Veresiye'
  }

  render() {
    return (
      <div className='Login'>

        <a className='Login-logo' href='/'>
          <p className='Login-logo-text'>Veresiye</p>
        </a>

        <form className='Login-form'>
          <input className='Login-form-input' type='email' placeholder='E-posta'></input>
          <input className='Login-form-input' type='password' placeholder='Şifre'></input>
          <button className='Login-form-button' type='submit'>Giriş yap</button>
        </form>

        <a className='Login-register' href='/register'>Hesabın yoksa buradan kayıt olabilirsin</a>

      </div>
    );
  }
}

export default Login;