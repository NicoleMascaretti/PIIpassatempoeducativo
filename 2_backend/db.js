const Users = mongoose.model ( "User", mongoose.Schema({
    user: {type: String},
    hash-psw: {type: String},
    salt: {type: String}
}))

async function inserirUsuarios (string user, string psw) {
    // storing variables
    const user = req.body.user
    const psw = req.body.psw
    // hashing

    // storing salt
    const salt = salthash
    
    // storing 
    const users = new Users({})
}
