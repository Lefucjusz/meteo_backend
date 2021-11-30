const SqliteDatabase = require('sqlite-async');

let db = null;

async function connectToDB() {
    try {
        db = await SqliteDatabase.open('./measurements.db');
    } catch(err) {
        throw new Error(`Error connecting to SQLite DB: ${err}!`);
    }
}

async function initializeDB() {
    try {
        await db.run(`
            CREATE TABLE IF NOT EXISTS measurements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sensor_name TEXT NOT NULL,
                timestamp INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
                temp_inside INTEGER NOT NULL,
                temp_outside INTEGER NOT NULL,
                humidity INTEGER,
                pressure INTEGER
            );`
        );
    } catch(err) {
        throw new Error(`Error initializing SQLite DB: ${err}!`);
    }
}

async function init() {
    await connectToDB();
    await initializeDB();
    console.log('Database initialized!');
}

init();

module.exports = db;