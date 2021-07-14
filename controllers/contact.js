const database=require("../config/database");
const getEmails=require("../lib/getEmails");
const getPhoneNos=require("../lib/getPhoneNos");

module.exports ={


    addContact:async(req,res)=>{

      try{
          if(req.body.name==null || req.body.phone==null || req.body.email==null) 
            throw new Error("One or More fields Empty");
          let result=await database.query("INSERT INTO contacts(name, dob) VALUES(?,?)",[req.body.name,req.body.dob]);
          let phonenos=await getPhoneNos(result.id,req.body.phone);
          let emails=await getEmails(result.id,req.body.email);
          await database.query("INSERT INTO phone(id,pnumber) VALUES ?",phonenos);
          await database.query("INSERT INTO emails(id,email) VALUES ?",emails);
          res.json({status:true});
      }catch(err){
          res.json({status:false, error:err.message});
      }


    },

    removeContact:async(req,res)=>{
        try{
            let id=req.params.id;
            await database.query("DELETE FROM contacts WHERE id=?",[id]);
            res.json({status:true});
        }catch(err){
            res.json({status:false, error:err.message});
        }
    },

    updateEmails:async(req,res)=>{
        try{
            let id=req.params.id;
            let emails=await getEmails(id,req.body.email);
            await database.query("DELETE FROM emails WHERE id=?",[id]);
            await database.query("INSERT INTO emails(id,email) VALUES ?",emails);
            res.json({status:true});
        }catch(err){
            res.json({status:false, error:err.message});
        }
    },

    updatePhone:async(req,res)=>{
        try{
            let id=req.params.id;
            let nos=await getPhoneNos(id,req.body.phone);
            await database.query("DELETE FROM phone WHERE id=?",[id]);
            await database.query("INSERT INTO emails(id,email) VALUES ?",emails);
            res.json({status:true});
        }catch(err){
            res.json({status:false, error:err.message});
        }
    },

    updateUser:async(req,res)=>{
        try{
            let id=req.params.id;
            await database.query("UPDATE TABLE contacts SET name=? dob=? WHERE id=?",[req.body.name,req.body.dob,id]);
            res.json({status:true});
        }catch(err){
            res.json({status:false, error:err.message});
        }
    },


    searchByEmail:async(req,res)=>{
        try{
            let email=req.params.email;
            let query=`select c.id,c.name,c.dob,
             (select GROUP_CONCAT(DISTINCT pnumber separator';') from phone p where c.id=p.id group by id) as nos,
             (select GROUP_CONCAT(DISTINCT email separator';')
             from emails e where c.id=e.id group by id) as emails from contacts c
            where c.id in (select id from emails where email=?) order by c.name`;
            let result=await database.query(query,[email]);
            res.json({status:true, data:result});
        }catch(err){
            res.json({status:false, error:err.message});
        }
    },

    searchByPhone:async(req,res)=>{
        try{
            let phoneno=req.params.phone;
            let query=`select c.id,c.name,c.dob,
             (select GROUP_CONCAT(DISTINCT pnumber separator';') from phone p where c.id=p.id group by id) as nos,
             (select GROUP_CONCAT(DISTINCT email separator';')
             from emails e where c.id=e.id group by id) as emails from contacts c
            where c.id in (select id from phone where pnumber=?) order by c.name`;
            let result=await database.query(query,[phoneno]);
            res.json({status:true, data:result});
        }catch(err){
            res.json({status:false, error:err.message});
        }
    },

    searchByName:async(req,res)=>{
        try{
            let name=req.params.name;
            let query=`select c.id,c.name,c.dob,
             (select GROUP_CONCAT(DISTINCT pnumber separator';') from phone p where c.id=p.id group by id) as nos,
             (select GROUP_CONCAT(DISTINCT email separator';')
             from emails e where c.id=e.id group by id) as emails from contacts c where c.name like %?% order by c.name`;
            let result=await database.query(query,[name]);
            res.json({status:true, data:result});
        }catch(err){
            res.json({status:false, error:err.message});
        }
    }




}