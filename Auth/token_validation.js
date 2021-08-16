const express = require("express");
const {verify, decode} = require("jsonwebtoken");


module.exports = {
    checkToken: (req,res,next) => {
        let token = req.get("authorization");
          if(token){
             token = token.slice(7);
             verify(token,"qwe1234",(error,decode)=>{
                 if (error){
                     return res.json({
                     success:0,
                     message:"Invalid token"
                 });
                }else{
                    next();
                }
             });

          }
          else{
                return res.json({
                    success:0,
                    message:"invalid access! unauthorized user"

                });

          }

    }

}