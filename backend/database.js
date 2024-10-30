const { MongoClient } = require("mongodb");

// Funcao para adicionar novo usuario no banco de dados

async function add(username, salt, hashpsw){
    const url = "mongodb+srv://gugsgod:123454321@cluster111.qppkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster111";

    const client = new MongoClient(url);
    await client.connect();
    // database and collection names
    const dbName = "passatempoEducativo";
    const collectionName = "users";
    // database and collection definition
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    let user = [];
    user.push(
        {
            username:username,
            salt:salt,
            hash_psw:hashpsw,
        }
    )
    
    // Codigo para inserir no banco de dados
    try  {
        const insertManyResult = await collection.insertMany(user);
        return console.log(`${insertManyResult.insertedCount} documents successfully inserted \n`);
    } catch (err) {
        return console.error(`Something went wrong trying to insert the new documents:  ${err}\n`)
    }
}
