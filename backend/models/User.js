const mongoose = require('mongoose')

const {Schema} =mongoose

const UserSchema = new Schema ({ 
    name :{
    type: String,
    required : true,
    },
    address :{
    type: String,
    required : true,
    },
    ChairmanName :{
    type: String,
    required : true,
    },
    Chairmanemail :{
    type: String,
    required : true,
    },
    Wings:{
    type: String,
    required : true,
    },

    Pincode :{
    type: String,
    required : true,
    },

    MobileNumber :{
    type: String,
    required : true,
    },
    
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('User',UserSchema)