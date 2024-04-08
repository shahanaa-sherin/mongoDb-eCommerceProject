const {default:mongoose} =require('mongoose');

async function config(){
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("database not connected",err);
    })
}
module.exports = config;