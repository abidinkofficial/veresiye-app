import React from 'react';
import './Details.css';
import Cookies from 'js-cookie';

class Details extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoad: false
    }

    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {

    fetch('http://localhost:5000/api/account' + window.location.pathname, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => this.setState({ data: data, isLoad: true }))
      .catch(err => console.log(err))
  }

  handleDeleteAccount(event) {
    event.preventDefault();

    fetch('http://localhost:5000/api/account' + window.location.pathname, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
      credentials: 'include'
    })
      .then(response => response.json());

      window.location = '/'
  
  }

  handleLogout(event) {
    event.preventDefault();

    Cookies.remove('auth-token');
    window.location = '/login'
  }

  render() {

    if (Cookies.get('auth-token')) {
      if (this.state.isLoad) {
        document.title = this.state.data[0].name + ' · Veresiye'
        return (
          <div className='Details'>

            <header className='Details-header'>

              <div className='Details-header-logo'>
                <a className='Details-header-logo-link' href='/'><span className='Details-header-logo-link-icon'></span>Ana sayfaya geri dön</a>
                <p className='Details-header-logo-text'>{this.state.data[0].name}</p>
              </div>

              <button className='Details-header-logout' onClick={this.handleLogout}>
                <p className='Details-header-logout-text'>Çıkış yap</p>
                <div className='Details-header-logout-logo'></div>
              </button>

            </header>

            <div className='Details-banner'>
              <p className='Details-banner-balance'>Hesaba ait güncel borç: <span className='Details-banner-balance-amount'>{this.state.data[0].accountTotal} TL</span></p>
              <div className='Details-banner-buttons'>
                <button className='Details-banner-buttons-addTransactionButton' onClick={() => window.location += '/add'}>Yeni kayıt ekle</button>
                <button className='Details-banner-buttons-closeAccountButton' onClick={this.handleDeleteAccount}>Veresiye hesabını kapat</button>
              </div>
            </div>

            <Transactions data={this.state.data[0]} />

          </div>
        );
      } else {
        return (<p>loading</p>);
      }
    } else {
      window.location = '/login'
    }
  };
}

//Dummy data

// let jsonData = {
//   "accountTotal": 4,
//   "_id": "5f60cb4efa83553ae49aa66b",
//   "name": "üçbeşikibeş",
//   "associatedUser": "5f579f14e929ee0a84820ac0",
//   "date": "2020-09-15T14:10:22.739Z",
//   "transactions": [
//     {
//       "previousTotal": 0,
//       "newTotal": 10,
//       "transactionDate": "2020-09-15T14:11:12.270Z",
//       "entries": [
//         {
//           "_id": "5f60cb80fa83553ae49aa66d",
//           "amount": 1,
//           "name": "ürün",
//           "price": 10
//         }
//       ],
//       "_id": "5f60cb80fa83553ae49aa66c",
//       "transactionType": "satis",
//       "transactionTotal": 10
//     },
//     {
//       "previousTotal": 10,
//       "newTotal": 4,
//       "transactionDate": "2020-09-15T14:11:46.290Z",
//       "entries": [
//         {
//           "_id": "5f60cba2fa83553ae49aa66f",
//           "amount": 1,
//           "name": "ödeme",
//           "price": 6
//         }
//       ],
//       "_id": "5f60cba2fa83553ae49aa66e",
//       "transactionType": "odeme",
//       "transactionTotal": 6
//     }
//   ],
//   "__v": 2
// }

function dateConverter(date) {
  let newDate = new Date(date);
  return (newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear());
}

function Transactions(props) {

  let transactions = [];
  if (props.data.transactions.length > 0) {
    for (let i = props.data.transactions.length - 1; i >= 0; i--) {
      let entries = [];
      for (let j = 0; j < props.data.transactions[i].entries.length; j++) {
        entries.push(
          <div className='Transaction-entries-entry' key={props.data.transactions[i].entries[j]._id}>
            <div className='Transaction-entries-entry-amount'>x{props.data.transactions[i].entries[j].amount}</div>
            <div className='Transaction-entries-entry-name'>{props.data.transactions[i].entries[j].name}</div>
            <div className='Transaction-entries-entry-price'>{props.data.transactions[i].entries[j].price} TL</div>
          </div>
        );
      }
      transactions.push(
        <div className='Transaction' key={props.data.transactions[i]._id}>
          <div className='Transaction-header'>
            <p className='Transaction-header-type negative'>{props.data.transactions[i].transactionType === 'odeme' ? 'ÖDEME' : 'SATIŞ'}</p>
            <p className='Transaction-header-date'>&nbsp;·&nbsp;{dateConverter(props.data.transactions[i].transactionDate)}</p>
          </div>
          <div className='Transaction-entries'>
            {entries}
          </div>
          <div className='Transaction-summary'>
            <div className='Transaction-summary-amount'>
              <p className='Transaction-summary-amount-text'>İşlem tutarı · <span className='Transaction-summary-amount-text-type'>{props.data.transactions[i].transactionType === 'odeme' ? 'Ödeme' : 'Satış'}</span></p>
              <p className='Transaction-summary-amount-number negative'>{props.data.transactions[i].transactionTotal} TL</p>
            </div>
            <div className='Transaction-summary-previousDebt'>
              <p className='Transaction-summary-previousDebt-text'>Önceki borç</p>
              <p className='Transaction-summary-previousDebt-number'>{props.data.transactions[i].previousTotal} TL</p>
            </div>
            <div className='Transaction-summary-newDebt'>
              <p className='Transaction-summary-newDebt-text'>İşlem sonrası yeni borç</p>
              <p className='Transaction-summary-newDebt-number negative'>{props.data.transactions[i].newTotal} TL</p>
            </div>
          </div>
        </div>
      );
    }
  }

  return transactions;
}

export default Details;