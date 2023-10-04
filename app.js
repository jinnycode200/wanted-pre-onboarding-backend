const express = require('express');
const mysql = require('mysql');


class RecuitNotice {
    constructor() {
        this.startWebServer();
    }
    startWebServer() {
        console.log('1')
        this.ConnectDB();
        /**초기값 추가할것! */
        // setTimeout(() => {
        //     this.setInitialData();    
        // }, 3000);

        let app = express();
        app.get("/",(req,res)=>{
            res.send("Hi!");
        })
        app.get("/register",(req,res)=>{
            this.registerNotice(req,res);
        })
        app.get("/modify",(req,res)=>{
            this.modifyNotice(req,res);
        })
        app.get("/delete",(req,res)=>{
            this.deleteNotice(req,res);
        })
        app.get("/list",(req,res)=>{
            this.getNoticeList(req,res);
        })
        app.get("/detail",(req,res)=>{
            this.getNoticeDetail(req,res);
        })
        app.get("/apply",(req,res)=>{
            this.applyRecuit(req,res);
        })
        /**추가예정(마지막순위) */
        app.get("/search",(req,res)=>{
            this.searchNotice(req,res);
        })
        app.listen(3000,()=>{
            console.log("listen!");
        })
    }
    ConnectDB() {
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
            });
        })
    }
    registerNotice(data,res){
        // res.send('등록페이지');
        res.send({result:results});
    }
    
    modifyNotice(data,res){
        res.send({result:results});
    }

    deleteNotice(data,res){
        res.send({result:results});
    }

    getNoticeList(data,res){
        res.send({result:results});
    }

    getNoticeDetail(data,res){
        res.send({result:results});
    }

    applyRecuit(data,res){
        res.send({result:results});
    }

    /**추가예정(마지막순서) */
    // searchNotice(data,res){
    //     res.send({result:results});
    // }
}
const recuit = new RecuitNotice();

