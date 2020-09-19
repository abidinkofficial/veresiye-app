import React from 'react';
import './Register.css';

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    }

    this.handleRegister = this.handleRegister.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  componentDidMount() {
    document.title = 'Giriş yap · Veresiye'
  }

  handleNameInput(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleEmailInput(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleRegister(event) {
    event.preventDefault();

    let requestBody = {
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password
    }

    const url = 'http://localhost:5000/api/user/register';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.text())
      .then(data => {
        window.location = '/login';
        this.setState({
          name: '',
          email: '',
          password: ''
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='Register'>

        <a className='Register-logo' href='/'>
          <p className='Register-logo-text'>Veresiye</p>
        </a>

        <form className='Register-form'>
          <input className='Register-form-input' type='text' placeholder='İsim' value={this.state.name} onChange={this.handleNameInput}></input>
          <input className='Register-form-input' type='email' placeholder='E-posta' value={this.state.email} onChange={this.handleEmailInput}></input>
          <input className='Register-form-input' type='password' placeholder='Şifre' value={this.state.password} onChange={this.handlePasswordInput}></input>
          <button className='Register-form-button' type='submit' onClick={this.handleRegister}>Kayıt ol</button>
        </form>

        <a className='Register-login' href='/login'>Hesabın varsa buradan giriş yapabilirsin</a>

      </div>
    );
  }
}

export default Register;