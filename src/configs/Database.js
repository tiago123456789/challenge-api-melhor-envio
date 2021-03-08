const MongoClient = require('mongodb').MongoClient;
let db = null;

const createConnection = () => {
    return new Promise((resolve, reject) => {
        if (db) {
            return resolve(db);
        }

        MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true }, function (err, client) {
            if (err) {
                reject(err);
                return;
            }
            db = client.db(process.env.DB_NAME);
            resolve(db);
        });
    });

}

module.exports = createConnection;