import React from 'react';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className='Home'>

        <header className='Home-header'>
          <a className='Home-header-logo' href='/'>
            <p className='Home-header-logo-text'>Veresiye</p>
          </a>
          <a className='Home-header-logout' href='/'>
            <p className='Home-header-logout-text'>Çıkış yap</p>
            <div className='Home-header-logout-logo'></div>
          </a>
        </header>

        <div className='Home-search'>
          <input className='Home-search-input' type='text' placeholder='Arama'></input>
          <button className='Home-search-button'></button>
        </div>

        <div className='Home-accounts'>
          <div className='Home-accounts-add'>
            <div className='Home-accounts-add-img'></div>
            <input className='Home-accounts-add-input' type='text' placeholder='Yeni veresiye hesabı'></input>
            <button className='Home-accounts-add-button'>Oluştur</button>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;