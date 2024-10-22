const { MongoClient } = require("mongodb");

async function run() { 
    const url = "mongodb+srv://gugsgod:123454321@cluster111.qppkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster111";

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

    try  {
        const insertManyResult = await collection.insertMany(user);
        console.log(`${insertManyResult.insertedCount} documents successfully inserted \n`);
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents:  ${err}\n`)
    }

}

run().catch(console.dir);
