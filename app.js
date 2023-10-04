const express = require('express');
const app = express();
const mysql = require('mysql');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'tuadlek11',
    database: 'wanted_preonboarding_backend',
    port: 3306
});

db.connect(function(err,result) {
    if(err) throw err;
    console.log(result);
})
