const express = require('express');
const Router = express.Router();
const conn = require('../controller/logs')

Router.post('/add', conn.add)
Router.get('/read', conn.read)

module.exports = Router