const mongoose = require('mongoose');

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
    entries: [entrySchema]
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
    transactions: [transactionSchema]
});

module.exports = mongoose.model('Account', accountSchema);