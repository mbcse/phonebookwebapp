var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mohit',
  database : 'phonebook'
});
 
connection.connect();

module.exports={
    query:async(query,data)=>{
        return new Promise((resolve,reject)=>{
            connection.query(query,data,(result,error)=>{
                if(error) reject(error);
                resolve(result);
            });
        })
    }
}