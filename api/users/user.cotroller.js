const {
    create,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
} = require("./user.service");
const {genSaltSync,hashSync,compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");

module.exports = {
    createUser: (req,res) => {
        const body = req.body;
          const salt = genSaltSync(10);
         body.password = hashSync(body.password, salt);

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
    getSingleUser: (req,res) => {
        const userId = req.params.uid;
        getUserById(userId,(error,results) => {
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
    getAllUsers: (req,res) => {
        getUsers((err,results)=>{
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
    updateUser: (req,res) =>{
        const body = req.body;
        let userId = req.params.uid;
         const salt = genSaltSync(10);
         body.password = hashSync(body.password,salt);
        updateUser(userId, body,(err,results) =>{
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
    deleteUser: (req,res) => {
        const userId = req.params.uid;
        deleteUser(userId,(error,results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                success:1,
                message:"user deleted successefuly"
        });
    });
    },
    login: (req,res) => {
        const data = req.body;

        getUserByEmail(data,(error,results)=>{
            if(error){
                console.log(error);
            }

            if(!results){
                return res.json({
                    success:0,
                    message:"Invalid email or password"
                }); 
            }

        const result = compareSync(data.password, results[0].password); 
        if (result) {
            results.password = undefined;
            const jsonwebtoken = sign ({result:results},process.env.TOKEN, {
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