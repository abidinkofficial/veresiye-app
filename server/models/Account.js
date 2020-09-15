const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

/* 
    The structure I want to implement:

    Account(s) (Theese are assoicated with a specific user for displaying and changing)
        -> Transaction(s)
            -> Entry(s)

    example:

    (logged in with a user, displaying accounts for this user:)

    "A" person's account 
        -> Transaction 1
            ->  Entry 1
            ->  Entry 2
        -> Transaction 2
            -> Entry 1
            -> Entry 2
            -> Entry 3
    "B" person's account
        -> (...)

*/

const entrySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  price: {
    type: Number,
    required: true
  }
});

const transactionSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    required: true
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  entries: [entrySchema],
  transactionTotal: {
    type: Number
  },
  previousTotal: {
    type: Number,
    default: 0
  },
  newTotal: {
    type: Number,
    default: 0
  }
})

transactionSchema.pre('save', function (next) {
  let total = 0;
  for (let i = 0; i < this.entries.length; i++) {
    let price = parseFloat(this.entries[i].price);
    total += price;
  }
  // if (this.transactionType === 'odeme') {
  //   this.transactionTotal = -total;
  // } else if (this.transactionType === 'satis') {
  //   this.transactionTotal = total;
  // }
  this.transactionTotal = total;
  next();
});

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 3
  },
  associatedUser: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  transactions: [transactionSchema],
  accountTotal: {
    type: Number,
    default: 0
  }
});

accountSchema.pre('save', function (next) {
  let newTotal = 0;
  let oldTotal = this.accountTotal;
  for (let i = 0; i < this.transactions.length; i++) {
    let transactionTotal = parseFloat(this.transactions[i].transactionTotal);
    // newTotal += transactionTotal;
    if (this.transactions[i].transactionType === 'odeme') {
      newTotal -= transactionTotal;
    } else if (this.transactions[i].transactionType === 'satis') {
      newTotal += transactionTotal;
    }
  }
  this.accountTotal = newTotal;
  if (this.transactions.length > 0) {
    this.transactions[this.transactions.length - 1].previousTotal = oldTotal;
    this.transactions[this.transactions.length - 1].newTotal = newTotal;
  }
  next();
});

module.exports = mongoose.model('Account', accountSchema);