const pool = require ("../../config/database");

module.exports = {
    create: (data,callBack) => {
        pool.query(

            `insert into users(email,password,role) values(?,?,?)`,

            [
               data.email,
               data.password,
               data.role
            ],
            (error,results,fields) => {
                if (error) {
                return callBack(error);
                }
                return callBack(null,results)
            }
        );
    },
    getUsers: (callBack) => {
        pool.query(

            `SELECT * FROM users`,null,
            (error,results,fields) => {
                if (error) {
                return callBack(error);
                }
                return callBack(null,results)
            }
        );
    },
    getUserById: (pid,callBack) => {
        pool.query(
            `select uid,email,role from users where uid = ?`,
            [pid],
            (error,results,fields) => {
                if(error){
                return callBack(error);
                    
                }
                return callBack(null,results[0]);
            }
        );
    },
    updateUser: (id, data, callBack) => {
        pool.query(
            `update users set email=?,password=?,role=? where pid=${id}`,
            [
                data.email,
                data.password,
                data.role
               
            ],
            (error,results,fields) => {
                if(error) {
                return callBack(error);
                }
                return callBack(null,results);
            }

        );
    },
    deleteUser: (id,callBack) => {
        pool.query(
            `delete from users where uid = ${id}`,
            null,
            (error,results,fields) => {
                if (error) {
                  return  callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    getUserByEmail: (data,callBack) => {
        pool.query(
            `select * from users where email=?`,
            [data.email],
            (error,results,fields) =>{
                if(error){
                  return  callBack(error);
                }
                 return callBack(null,results);
            }
        );
    },

};