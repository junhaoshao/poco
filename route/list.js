const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
  let output={
    img:[]
  }
  var sql='SELECT * FROM poco_vm;';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    output.img=result;
    res.send(output);
  })
})
module.exports=router;