const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const verify = require('./verifyToken');
const { deleteOne } = require('../models/Account');

//Getting one account
router.get('/:id', verify, async (req, res) => {
    let userId = jwt.decode(req.header('auth-token'))._id;
    let account;
    try {
        account = await Account.find({ _id: req.params.id, associatedUser: userId  })
        if (account == null) {
            return res.status(400).json({ message: 'Cannot find the account' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.json(account);
});

//Getting all accounts
router.get('/', verify, async (req, res) => {
    let userId = jwt.decode(req.header('auth-token'))._id;
    try {
        const accounts = await Account.find({ associatedUser: userId});
        res.json(accounts);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Creating an account
router.post('/', verify, async (req, res) => {
    let userId = jwt.decode(req.header('auth-token'))._id;
    const account = new Account({
        name: req.body.name,
        associatedUser: userId,
    });
    try {
        const newAccount = await account.save();
        res.status(201).json({ message: newAccount._id });
    } 
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Deleting an account
router.delete('/:id', verify, async (req, res) => {
    try {
        await Account.findByIdAndDelete(req.params.id);
        res.json({ message: "Account removed" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;