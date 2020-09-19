import React from 'react';
import './Home.css';
import Cookies from 'js-cookie';
class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      newAccountName: '',
      searchString: ''
    }

    this.handleNewAccountInput = this.handleNewAccountInput.bind(this);
    this.handleNewAccount = this.handleNewAccount.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    document.title = 'Ana sayfa · Veresiye';

    fetch('http://localhost:5000/api/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.log(err))

  }

  handleNewAccount(event) {
    event.preventDefault();

    let requestBody = {
      "name": this.state.newAccountName
    }

    fetch('http://localhost:5000/api/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      },
      credentials: 'include',
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        fetch('http://localhost:5000/api/account', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          },
          credentials: 'include'
        })
          .then(response => response.json())
          .then(data => this.setState({ data: data }))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err));

    this.setState({newAccountName: ''});

  }

  handleNewAccountInput(event) {
    this.setState({
      newAccountName: event.target.value
    });
  }

  handleSearchInput(event) {
    this.setState({
      searchString: event.target.value
    });
  }

  handleLogout(event) {
    event.preventDefault();

    Cookies.remove('auth-token');
    window.location = '/login'
  }

  render() {

    if (Cookies.get('auth-token')) {

      let accounts = [];
      for (let i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].name.toLowerCase().includes(this.state.searchString.toLowerCase())) {
          let url = '/' + this.state.data[i]._id;
          accounts.push(<Account name={this.state.data[i].name} balance={this.state.data[i].accountTotal} url={url} key={this.state.data[i]._id} />)
        }
        
        // let url = '/' + this.state.data[i]._id;
        // accounts.push(<Account name={this.state.data[i].name} balance={this.state.data[i].accountTotal} url={url} key={this.state.data[i]._id} />)
      }

      return (
        <div className='Home'>

          <header className='Home-header'>

            <a className='Home-header-logo' href='/'>
              <p className='Home-header-logo-text'>Veresiye</p>
            </a>

            <button className='Home-header-logout' onClick={this.handleLogout}>
              <p className='Home-header-logout-text'>Çıkış yap</p>
              <div className='Home-header-logout-logo'></div>
            </button>

          </header>

          <div className='Home-search'>
            <input className='Home-search-input' type='text' placeholder='Arama' onChange={this.handleSearchInput} ></input>
            <div className='Home-search-button'></div>
          </div>

          <div className='Home-accounts'>

            <div className='Home-accounts-add'>
              <div className='Home-accounts-add-img'></div>
              <input className='Home-accounts-add-input' type='text' placeholder='Yeni veresiye hesabı' value={this.state.newAccountName} onChange={this.handleNewAccountInput} ></input>
              <button className='Home-accounts-add-button' onClick={this.handleNewAccount}>Oluştur</button>
            </div>

            {accounts}
            {/* <Account name='Çatakmiray Nurbişeng Şenşebek' balance='7.25' />
          <Account name='Kolpaçino Özgür' balance='1000.00' /> */}

          </div>

        </div>
      );

    } else {
      window.location = '/login'
    }


  }
}

function Account(props) {
  return (
    <a className='Home-accounts-account' href={props.url}>
      <div className='Home-accounts-account-img'></div>
      <p className='Home-accounts-account-name'>{props.name}</p>
      <p className='Home-accounts-account-balance'>{props.balance} TL</p>
    </a>
  );
}

export default Home;

// let jsonData = [
//   {
//     "accountTotal": 4,
//     "_id": "5f60cb4efa83553ae49aa66b",
//     "name": "hesap 1",
//     "associatedUser": "5f579f14e929ee0a84820ac0",
//     "date": "2020-09-15T14:10:22.739Z",
//     "transactions": [],
//     "__v": 2
//   }, {
//     "accountTotal": 10000,
//     "_id": "5f60cb4efa83sds553ae49aa66b",
//     "name": "hesap 2",
//     "associatedUser": "5f579f14e929ee0a84820ac0",
//     "date": "2020-09-16T14:10:22.739Z",
//     "transactions": [],
//     "__v": 2
//   }, {
//     "accountTotal": 23.25,
//     "_id": "5f60cb4efa83553hhae49aa66b",
//     "name": "hesap 3",
//     "associatedUser": "5f579f14e929ee0a84820ac0",
//     "date": "2020-09-17T14:10:22.739Z",
//     "transactions": [],
//     "__v": 2
//   },
// ]