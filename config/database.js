var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Mohit@12345',
  database : 'phonebook',
  insecureAuth : true
});
 
connection.connect((err, connection) => {
    if(err) console.log(err);
    console.log("Mysql Database connected");
});

module.exports={
    query:async(query,data)=>{
        return new Promise((resolve,reject)=>{
            connection.query(query,data,(error,result)=>{
                if(error) reject(error);
                resolve(result);
            });
        })
    }
}