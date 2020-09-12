import React from 'react';
import './Register.css';

class Register extends React.Component {

  componentDidMount() {
    document.title = 'Giriş yap · Veresiye'
  }

  render() {
    return (
      <div className='Register'>

        <a className='Register-logo' href='/'>
          <p className='Register-logo-text'>Veresiye</p>
        </a>

        <form className='Register-form'>
          <input className='Register-form-input' type='text' placeholder='İsim'></input>
          <input className='Register-form-input' type='email' placeholder='E-posta'></input>
          <input className='Register-form-input' type='password' placeholder='Şifre'></input>
          <button className='Register-form-button' type='submit'>Kayıt ol</button>
        </form>

        <a className='Register-login' href='/login'>Hesabın varsa buradan giriş yapabilirsin</a>

      </div>
    );
  }
}

export default Register;