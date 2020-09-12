import React from 'react';
import './Home.css';

class Home extends React.Component {

  componentDidMount() {
    document.title = 'Ana sayfa · Veresiye'
  }

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

          <Account name='Çatakmiray Nurbişeng Şenşebek' balance='7.25'/>
          <Account name='Kolpaçino Özgür' balance='1000.00'/>

        </div>

      </div>
    );
  }
}

function Account(props) {
  return (
    <a className='Home-accounts-account' href='/'>
      <div className='Home-accounts-account-img'></div>
      <p className='Home-accounts-account-name'>{props.name}</p>
      <p className='Home-accounts-account-balance'>{props.balance} TL</p>
    </a>
  );
}

export default Home;