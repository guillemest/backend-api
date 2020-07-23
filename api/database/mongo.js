const {
    MongoMemoryServer
} = require('mongodb-memory-server');
const {
    MongoClient
} = require('mongodb');

let database = null;

exports.startDatabase = () => {
    return new Promise((resolve, reject) => {
        const mongo = new MongoMemoryServer();
        mongo.getConnectionString().then(mongoDBURL => {
            MongoClient.connect(mongoDBURL, {
                useUnifiedTopology: true
            }).then(connection => {
                database = connection.db();
                resolve(database);
            }).catch(err => reject(err))
        }).catch(err => new Error(err))
    })
}

exports.getDatabase = () => {
    return database;
}