const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

// create a connection "pool" to our postgres DB
const pool = new pg.Pool({
    database: 'jazzy_sql', // <-- name of the database

    // optional parameters
    host: 'localhost',
    port: 5432
});

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// TODO - Replace static content with a database tables
const artistList = [ 
    {
        name: 'Ella Fitzgerald',
        birthdate: '04-25-1917'
    },
    {
        name: 'Dave Brubeck',
        birthdate: '12-06-1920'
    },       
    {
        name: 'Miles Davis',
        birthdate: '05-26-1926'
    },
    {
        name: 'Esperanza Spalding',
        birthdate: '10-18-1984'
    },
]
const songList = [
    {
        title: 'Take Five',
        length: '5:24',
        released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        released: '1959-08-17'
    },
    {
        title: 'Black Gold',
        length: '5:17',
        released: '2012-02-01'
    }
];

app.get('/artist', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "artist"
        ORDER BY "birthdate" ASC;
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            // send the db results
            // to the client
            res.send(dbRes.rows);
        }).catch((err) => {
            console.log('SQL failed', err);
            res.sendStatus(500);
        });
});

app.post('/artist', (req, res) => {
    let sqlQuery = `
        INSERT INTO "artist"
            ("name", "birthdate")
        VALUES
            ('${req.body.name}', '${req.body.birthdate}')
    `;
    // let sqlParams = [
    //     req.body.name,      // $1
    //     req.body.birthdate  // $2
    // ];

    console.log('sqlQuery', sqlQuery);

    // send the query to the db
    pool.query(sqlQuery)
        // everyone is happy, so just send
        // a happy little response back
        // bob ross style!!
        .then((dbRes) => {
            res.sendStatus(201); // created
        }).catch((err) => {
            console.log('POST error', err);
            res.sendStatus(500);
        });
});

app.get('/song', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "song"
        ORDER BY "title";
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            // send the db results
            // to the client
            res.send(dbRes.rows);
        }).catch((err) => {
            console.log('SQL failed', err);
            res.sendStatus(500);
        });
});

app.post('/song', (req, res) => {
    let sqlQuery = `
        INSERT INTO "song"
            ("title", "length", "released")
        VALUES
            ('${req.body.title}', '${req.body.length}', '${req.body.released}')
    `;
    // let sqlParams = [
    //     req.body.title,     // $1
    //     req.body.length,    // $2
    //     req.body.released   // $3
    // ];

    console.log('sqlQuery', sqlQuery);

    // send the query to the db
    pool.query(sqlQuery)
        // everyone is happy, so just send
        // a happy little response back
        // bob ross style!!
        .then((dbRes) => {
            res.sendStatus(201); // created
        }).catch((err) => {
            console.log('POST error', err);
            res.sendStatus(500);
        });
});


