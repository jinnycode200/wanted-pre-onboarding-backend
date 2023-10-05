const express = require('express');
const mysql = require('mysql');
class RecuitNotice {
    constructor() {
        this.oDbConfig = {
            host: '127.0.0.1',
            user: 'root',
            password: 'tuadlek11',
            database: 'wanted_preonboarding_backend',
            port: 3306,
            multipleStatements : true
        };
        this.startWebServer();
    }
    startWebServer() {
        this.ConnectDB();
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
            req = {
                idx: 8,
            };
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
        const oDb = mysql.createConnection(this.oDbConfig);
        oDb.connect(function(err) {
            if(err) throw err;
            oDb.query("CREATE TABLE IF NOT EXISTS company(idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name VARCHAR(11) NOT NULL);CREATE TABLE IF NOT EXISTS notice(idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT, nation VARCHAR(11) NOT NULL, region VARCHAR(11) NOT NULL, position VARCHAR(20) NOT NULL, reward INT, skill VARCHAR(11) NOT NULL, detail VARCHAR(200),company_id INT NOT NULL, FOREIGN KEY(company_id) REFERENCES company(idx));CREATE TABLE IF NOT EXISTS user(idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT, id VARCHAR(11) NOT NULL,applied_notice INT NOT NULL, FOREIGN KEY(applied_notice) REFERENCES notice(idx));",
            function(err) {
                console.log(err)
            });
        })
    }

    registerNotice(data,res){
        const oDb = mysql.createConnection(this.oDbConfig);
        let sql = "INSERT INTO notice (nation,region,position,reward,skill,detail,company_id) VALUES (?,?,?,?,?,?,?)";
        let values = [data.nation, data.region, data.position, data.reward, data.skill, data.detail, data.company_id];
        oDb.query(sql,values,function(err,result) {
            if(err) throw err;
            if(result.affectedRows > 0) {
                res.send("공고 등록이 완료되었습니다.");
            }
        })
    }
    
    modifyNotice(data,res){
        const oDb = mysql.createConnection(this.oDbConfig);
        let sql = "UPDATE notice SET nation = ?, region = ?, position = ?, reward = ?, skill = ?, detail = ? WHERE idx = ?";
        let values = [data.nation, data.region, data.position, data.reward, data.skill, data.detail, data.idx];
        oDb.query(sql,values,function(err,result) {
            if(err) throw err;
            console.log(result);
            if(result.affectedRows == 1) {
                res.send("공고 수정이 완료되었습니다.");
            }
        })
    }

    deleteNotice(data,res){
        const oDb = mysql.createConnection(this.oDbConfig);
        let sql = "DELETE FROM notice WHERE idx = ?";
        let value = [data.idx];
        oDb.query(sql,value,function(err,result) {
            if(err) throw err;
            console.log(result);
            if(result.affectedRows == 1) {
                res.send("공고 삭제가 완료되었습니다.");
            }
        })
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

