const express=require("express");
const router=express.Router();
const pool=require("../pool.js");
const md5 = require("md5")

router.post("/login",(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var sql="SELECT * FROM users WHERE uname=? and upwd=md5(?)";
    console.log(md5(upwd))
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) console.log(err);
        if(result.length==1){
            res.send({ok:1,msg:"登录成功!"});
        }else{
            res.send({ok:0,msg:'用户名或密码错误！'});
        }
    });

});
router.post("/vali",(req,res)=>{
    var uname=req.body.uname;
    var sql="SELECT * FROM users WHERE uname=?";
    pool.query(sql,[uname],(err,result)=>{
        if(err) console.log(err);
        if(result.length==1)
            res.send({ok:0,msg:'该手机号已被注册！'});
        else
            res.send({ok:1,msg:'手机号可使用！'});
    });
});
router.post("/signUp",(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var sql="INSERT INTO users VALUES(NULL,?,md5(?))";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) console.log(err);
        if(result.affectedRows>0)
            res.send({ok:1,msg:'注册成功！'});
        else
            res.send({ok:0,msg:'注册失败！'});
    });
});

module.exports=router;