const error = (msg='somthing went wrong ',status=500)=>{
    const e = new Error(msg)
    e.status = status 
    return e 
}


module.exports = error 