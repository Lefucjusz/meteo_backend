const SqliteDatabase = require('sqlite-async');

async function initializeDB() {
    try {
        const db = await SqliteDatabase.open('./measurements.db');
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
        console.log('Database initialized!');
        return db;
    } catch(err) {
        throw new Error(`Error initializing SQLite DB: ${err}!`);
    }
}

module.exports = initializeDB();
