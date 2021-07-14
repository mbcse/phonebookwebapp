const getPhoneNos=async(id,phoneString)=>{
    return new Promise((resolve, reject)=>{
        let nos=phoneString.split(";");
        nos=nos.map((no)=>{
            if(!no.match(/^\d{10}$/)){
                reject("Not a valid no, Please avoid spaces, area code etc");
            }
            return [id,no]; 
        })

        resolve(nos);
    })
}

module.exports=getPhoneNos;