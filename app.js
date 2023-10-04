const express = require('express');
const app = express();
const mysql = require('mysql');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'tuadlek11',
    database: 'wanted_preonboarding_backend',
    port: 3306,
    multipleStatements : true
});

db.connect(function(err) {
    if(err) throw err;
    db.query("CREATE TABLE IF NOT EXISTS company(idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name VARCHAR(11) NOT NULL);CREATE TABLE IF NOT EXISTS notice(idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT, nation VARCHAR(11) NOT NULL, region VARCHAR(11) NOT NULL, position VARCHAR(20) NOT NULL, reward INT, skill VARCHAR(11) NOT NULL, detail VARCHAR(200),company_id INT NOT NULL, FOREIGN KEY(company_id) REFERENCES company(idx));CREATE TABLE IF NOT EXISTS user(idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT, id VARCHAR(11) NOT NULL,applied_notice INT NOT NULL, FOREIGN KEY(applied_notice) REFERENCES notice(idx));",
    function(err) {
        console.log(err)
    })
})
