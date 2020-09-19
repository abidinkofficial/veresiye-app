import React from 'react';
import './Add.css';
import Cookies from 'js-cookie';

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        transactionType: 'satis',
        entries: []
      },
      inputData: {
        amount: '',
        name: '',
        price: ''
      },
      data: {}
    }

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSaveEntry = this.handleSaveEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    document.title = 'Yeni kayıt · Veresiye'

    let url = window.location.pathname;
    url = url.split('/')
    console.log(url[1])

    fetch('http://localhost:5000/api/account/' + url[1], {
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


  handleAmountChange(event) {
    this.setState({
      inputData: {
        amount: event.target.value,
        name: this.state.inputData.name,
        price: this.state.inputData.price
      }
    })
  }

  handleNameChange(event) {
    this.setState({
      inputData: {
        amount: this.state.inputData.amount,
        name: event.target.value,
        price: this.state.inputData.price
      }
    })
  }

  handlePriceChange(event) {
    this.setState({
      inputData: {
        amount: this.state.inputData.amount,
        name: this.state.inputData.name,
        price: event.target.value
      }
    })
  }

  handleTypeChange(event) {
    this.setState({
      formData: {
        transactionType: event.target.value,
        entries: this.state.formData.entries
      }
    })
  }

  handleSaveEntry(event) {
    event.preventDefault();
    let newEntry = {
      amount: this.state.inputData.amount,
      name: this.state.inputData.name,
      price: this.state.inputData.price
    }
    this.setState({
      formData: {
        transactionType: this.state.formData.transactionType,
        entries: [...this.state.formData.entries, newEntry]
      },
      inputData: {
        amount: '',
        name: '',
        price: ''
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    let requestBody = {
      "transaction": {
        "transactionType": this.state.formData.transactionType,
        "entries": [...this.state.formData.entries]
      }
    }

    let url = window.location.pathname;
    url = url.split('/')
    console.log(url[1])

    fetch('http://localhost:5000/api/account/' + url[1], {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
      credentials: 'include',
      body: JSON.stringify(requestBody)
    })
      .catch(err => console.log(err))

    window.location = '/' + (this.state.data[0]._id);
  }

  handleLogout(event) {
    event.preventDefault();

    Cookies.remove('auth-token');
    window.location = '/login'
  }

  render() {

    let url = window.location.pathname;
    url = url.split('/')

    if (Cookies.get('auth-token')) {
      if (this.state.isLoad) {
        let entries = [];
        let total = 0;
  
        for (let i = 0; i < this.state.formData.entries.length; i++) {
          total += Number(this.state.formData.entries[i].price);
          entries.push(
            <div className='Add-form-display-entry' key={this.state.formData.entries.indexOf(this.state.formData.entries[i])}>
              <div className='Add-form-display-entry-amount'>
                <span>x</span>{this.state.formData.entries[i].amount}
              </div>
              <div className='Add-form-display-entry-name'>
                {this.state.formData.entries[i].name}
              </div>
              <div className='Add-form-display-entry-price'>
                {this.state.formData.entries[i].price}<span>&nbsp;TL</span>
              </div>
            </div>
          );
        }
  
        let summaryNew;
        if (this.state.formData.transactionType === 'satis') {
          summaryNew = total + this.state.data[0].accountTotal
        } else if (this.state.formData.transactionType === 'odeme') {
          summaryNew = this.state.data[0].accountTotal - total;
        }
  
        return (
          <div className='Add'>
  
            <header className='Add-header'>
  
              <div className='Add-header-logo'>
                <a className='Add-header-logo-link' href={'/' + url[1]}><span className='Add-header-logo-link-icon'></span>{this.state.data[0].name}</a>
                <p className='Add-header-logo-text'>Hesaba yeni kayıt ekle</p>
              </div>
              <button className='Add-header-logout' onClick={this.handleLogout}>
                <p className='Add-header-logout-text'>Çıkış yap</p>
                <div className='Add-header-logout-logo'></div>
              </button>
  
            </header>
  
            <div className='Add-form'>
  
              <select className='Add-form-type' onChange={this.handleTypeChange}>
                <option className='Add-form-type-option' value='satis'>Satış</option>
                <option className='Add-form-type-option' value='odeme'>Ödeme</option>
              </select>
  
              <div className='Add-form-display'>
                {entries}
              </div>
  
              <div className='Add-form-entries'>
                <div className='Add-form-entries-entry'>
                  <div className='Add-form-entries-entry-amount'>
                    <span>x</span><input className='Add-form-entries-entry-amount-input' type='number' required onChange={this.handleAmountChange} value={this.state.inputData.amount}></input>
                  </div>
                  <div className='Add-form-entries-entry-name'>
                    <input className='Add-form-entries-entry-name-input' type='text' placeholder='Öğe adı' required onChange={this.handleNameChange} value={this.state.inputData.name}></input>
                  </div>
                  <div className='Add-form-entries-entry-price'>
                    <input className='Add-form-entries-entry-price-input' type='number' required onChange={this.handlePriceChange} value={this.state.inputData.price}></input>&nbsp;<span>TL</span>
                  </div>
                  <button className='Add-form-entries-entry-save' onClick={this.handleSaveEntry}><span role='img' aria-label='save'>✔️</span></button>
                </div>
              </div>
  
              <div className='Add-form-summary'>
                <div className='Add-form-summary-total'>
                  <p className='Add-form-summary-total-text'>İşlem tutarı&nbsp;·&nbsp;{this.state.formData.transactionType === 'odeme' ? 'Ödeme' : 'Satış'}</p>
                  <p className='Add-form-summary-total-number'>{total} TL</p>
                </div>
                <div className='Add-form-summary-previous'>
                  <p className='Add-form-summary-previous-text'>Önceki borç</p>
                  <p className='Add-form-summary-previous-number'>{this.state.data[0].accountTotal} TL</p>
                </div>
                <div className='Add-form-summary-new'>
                  <p className='Add-form-summary-new-text'>İşlem sonrası yeni borç</p>
                  <p className='Add-form-summary-new-number'>{summaryNew} TL</p>
                </div>
              </div>
              <button className='Add-form-submit' onClick={this.handleSubmit}>Kaydı tamamla</button>
  
            </div>
  
          </div>
        );
      } else {
        return <p>loading</p>
      }
    } else {
      window.location = '/login'
    }
  }
}

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

export default Add;