const express = require("express");
const pool = require("../pool.js");

const router = express.Router();

//照片类别
router.get("/",(req,res)=>{
    var output={
        info:{/*详细信息*/}
    };
    var now_id=req.query.now_id;
    // console.log(now_id);
    if(now_id=="editor"||now_id=="moderator"||now_id=="region"){
        
        // 查找推荐图片
        var type_sql=`SELECT * FROM poco_photos WHERE ${now_id}=1;`
        // console.log(type_sql);
        // console.log(now_id);
        pool.query(type_sql,[],(err,result)=>{
            if(err) throw err;
            output.info=result;
            console.log(222);
            res.send(output);
        })
    }
    else if(now_id=="today_tops"||now_id=="week_tops"||now_id=="month_tops"){
        // 查找人气图片
        var type_sql="SELECT * FROM poco_photos ORDER BY good DESC;"
        // console.log(type_sql);
        // console.log(now_id);
        pool.query(type_sql,[],(err,result)=>{
            if(err) throw err;
            output.info=result;
             console.log(333);
            res.send(output);
        })
    }
    else{
        // 查找类别图片
        var type_sql="SELECT * FROM poco_photos WHERE type=?;"
        // console.log(type_sql);
        // console.log(now_id);
        pool.query(type_sql,[now_id],(err,result)=>{
            if(err) throw err;
            output.info=result;
            // console.log(result);
            res.send(output);
            console.log(111);
        })
    }
    
})   
//勋章作品
   
    
//最新

module.exports = router;