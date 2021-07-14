const getEmails=async(id,emailString)=>{
    return new Promise((resolve, reject)=>{
        let emails=emailString.split(";");
        emails=emails.map((email)=>{
            if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                reject("Not a valid email");
            }
            return [id,email]; 
        })

        resolve(emails);
    })
}

module.exports =getEmails;
// getEmails('1',"abc@amils.com;dhsjhdjkjk.in").then((nos)=>{
//     console.log(nos);
// }).catch((err)=>{
//     console.log(err);

// })
