const {default:mongoose} =require('mongoose');

function config(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("database not connected",err);
    })
}

module.exports = config;