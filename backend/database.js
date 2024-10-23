const readline  = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, answer => {
            resolve(answer);
        });
    });
};

async function println(x){
    return console.log(x);
}
async function add(newUsers){
    let user = [];
    for (i = 0; i < newUsers; i++) {
        let username = await askQuestion("Insert username: ");
        let salt = await askQuestion("Insert salt: ");
        let psw = await askQuestion("Insert psw hashed: ");

        user.push(
            {
                username:username,
                salt:salt,
                hash_psw:psw,
            }
        )
    }
    console.log(user)
    /*
    try  {
        const insertManyResult = await collection.insertMany(user);
        return console.log(`${insertManyResult.insertedCount} documents successfully inserted \n`);
    } catch (err) {
        return console.error(`Something went wrong trying to insert the new documents:  ${err}\n`)
    }
    */
}
 
const { MongoClient } = require("mongodb");

async function run() { 
    const url = "";

    const client = new MongoClient(url);

    await client.connect();

    const dbName = "passatempoEducativo";
    const collectionName = "users";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const user = [
        {
            username:"gugsgod",
            salt: "salgrosso",
            hash_psw: "kajsd23jjj432klknudnkjhiwuehql",
        },
        {
            username:"nicoleMascaretti",
            salt:"salgado",
            hash_psw: "fjhalshdgf3g28fyg8d27fg3872gfgu",
        }
    ]

    

}

add(3);
