const User = require('../Model/userModel')

const findUserProperty = (key,value)=>{
    if(key === "_id"){
        return User.findById(value)
    }
    return User.findOne({[key]:value})
}

const createUser = ({name,email,password})=>{
    const user = new User({name,email,password})
    return user.save()
}

module.exports = {
    findUserProperty,
    createUser
}


