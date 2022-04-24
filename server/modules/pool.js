const pg = require('pg');

const Pool = pg.Pool;
const config = {
    database: 'tasks',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 60000
}

const pool = new Pool( config );

pool.on( "connect", () => {
    console.log('connected to postgresql database successfully.')
})

pool.on("error", (err) => {
    console.log('error connecting to postgresql database', err);
})

module.exports = pool;