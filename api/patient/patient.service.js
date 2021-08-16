const pool = require ("../../config/database");

module.exports = {
    create: (data,callBack) => {
        pool.query(

            `insert into patients(firstname,lastname,address,gender,contact) values(?,?,?,?,?)`,

            [
                data.firstname,
                data.lastname,
                data.address,
                data.gender,
                data.contact

            ],
            (error,results,fields) => {
                if (error) {
                return callBack(error);
                }
                return callBack(null,results)
            }
        );
    },
    getPatients: (callBack) => {
        pool.query(

            `SELECT * FROM patients`,null,
            (error,results,fields) => {
                if (error) {
                return callBack(error);
                }
                return callBack(null,results)
            }
        );
    },
    getPatientsById: (pid,callBack) => {
        pool.query(
            `select pid,firstname,lastname,address,gender,contact from patients where pid = ?`,
            [pid],
            (error,results,fields) => {
                if(error){
                return callBack(error);
                    
                }
                return callBack(null,results[0]);
            }
        );
    },
    updatePatients: (id, data, callBack) => {
        pool.query(
            `update patients set firstname=?,lastname=?,address=?,gender=?,contact=? where pid=${id}`,
            [
                data.firstname,
                data.lastname,
                data.address,
                data.gender,
                data.contact
            ],
            (error,results,fields) => {
                if(error) {
                return callBack(error);
                }
                return callBack(null,results);
            }

        );
    },
    deleteUser: (data,callBack) => {
        pool.query(
            `delete from users where uid = ?`,
            [data.uid],
            (error,callBack,fields) => {
                if (error) {
                  return  callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    getUserByEmail: (data,callBack) => {
        pool.query(
            `slect from patients where email=?`,
            [email],
            (error,results,fields) =>{
                if(error){
                  return  callBack(error);
                }
                 return callBack(null,results[0]);
            }
        );
    },

};