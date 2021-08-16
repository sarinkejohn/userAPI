const {
    create,
    getPatients,
    getPatientsById,
    updatePatients,
    deleteUser,
    getUserByEmail
} = require("./patient.service");
const {genSaltSync,hashSync,compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");
const e = require("express");

module.exports = {
    createPatient: (req,res) => {
        const body = req.body;
        //  const salt = genSaltSync(10);
        //  body.password = hashSync(body.password, salt);

        create(body,(err,results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DATABASE connection Error"
                });
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    getPatientsById: (req,res) => {
        const pid = req.params.pid;
        getPatientsById(pid,(error,results) => {
           if(error) {
               console.log(error);
               return;
           }
           if(!results) {
               return res.json({
                   success:0,
                   message:"Record not found"
               });
           }
           return res.json({
               success: 1,
               data: results
           });

        });

       
    },
    getAllPatients: (req,res) => {
        getPatients((err,results)=>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DATABASE connection Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updatePatients: (req,res) =>{
        const body = req.body;
        let pid = req.params.id;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password,salt);
        updatePatients(pid, body,(err,results) =>{
            if(err){
                console.log(error);
                return;
            }
            return res.json({
                success:1,
                message:"updated sucesseful"
            });
        });
    },
    deleteUser: (res,req) => {
        const body = req.body;
    deleteUser(data,(error,results) => {
        if(error){
            console.log(error);
            return;
        }
        if(!results){
            return res.json({
                success:0,
                message:"Taarifa hiyo haipo"
            });
        }
        return res.json({
            success:1,
            message:"user deleted successefuly"
        });
    });
    },
    login: (req,res) => {
        const body = req.body;
        getUserByEmail(body.email,(error,results)=>{
            if(error){
                console.log(error);
            }
            if(!results){
                return res.json({
                seccess:0,
                message:"Invalid email or password"
            
            });
        }
        const requst = compareSync(body.password, body.results); 
        if (results) {
            results.password = undefined;
            const jsonwebtoken = sign ({result:results},"qwe1234", {
                expiresIn : "1h"
            });
            return res.json({
                success:1,
                message:"login sucessiful",
                token: jsonwebtoken
            });
            
        }
        else{
            return res.json({
                success:0,
                message:"invalid password or email"
            });
        }
        });
    }
};