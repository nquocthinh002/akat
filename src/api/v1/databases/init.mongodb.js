const mongoose = require('mongoose')

const { db: { mongodb, host, port, name } } = require('../configs/config.mongodb')
// mongodb+srv://pethinh1810_db_user:0MroJTgZdETQr9kv@cluster0.gupbpag.mongodb.net/?appName=Cluster0
const connectString = `${mongodb}://${host}:${port}/${name}`

class Database {
    constructor() {
        this.connect()
    }

    connect() {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
        }

        mongoose.connect(connectString).then(_ => console.log(`Connected Mongodb Success!!!`))
        .catch( err => console.log(`Error connect database!!!\n`))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://pethinh1810_db_user:0MroJTgZdETQr9kv@cluster0.gupbpag.mongodb.net/?appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
