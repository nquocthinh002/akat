

// mongodb+srv://pethinh1810_db_user:0MroJTgZdETQr9kv@cluster0.gupbpag.mongodb.net/?appName=Cluster0
// const connectString = `mongodb://${host}:${port}/${name}`
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3052
    },
    db: {
        
        mongodb: process.env.DEV_DB_MONGODB || 'mongodb',
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'akatDEV',
    }
}

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3000
    },
    db: {
        mongodb: process.env.PRO_DB_MONGODB || 'mongodb+srv',
        host: process.env.PRO_DB_HOST || 'pethinh1810_db_user',
        port: process.env.PRO_DB_PORT || '0MroJTgZdETQr9kv@cluster0.gupbpag.mongodb.net',
        name: process.env.PRO_DB_NAME || '?appName=Cluster0',
    }
}

const config = { dev, pro }
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]