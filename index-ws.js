const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', function (req, res) {

    res.sendFile('index.html', {root: __dirname});
});

server.on('request', app);

server.listen(3000, function () {console.log('listening on 3000')});

process.on('SIGINT', () => {
    console.log('sigint');
    wss.clients.forEach(function each(client) {
        client.close();
    });
    server.close(() => {
        shutdownDB();
    })
})



/** Begin Websocket */

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({server: server});
export const numClients = wss.clients.size;
wss.on('connection', function connection(ws){


        console.log('Clients connected', numClients);

        wss.broadcast(`${numClients}`);

        if (ws.readyState === ws.OPEN){

        }
        db.run(`INSERT INTO visitors (count, time)
            VALUES (${numClients}, datetime('now'))
            
        `);

        ws.on('close', function close(){
            console.log('disconnected')
        })

});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client){
        client.send(data);
    });
}
/** end websocket start database */
const sqlite = require('sqlite3');
const db = new sqlite.Database(':memory:');

db.serialize(() => {
    db.run(`
        CREATE TABLE visitors (
            count INTEGER,
            time TEXT
        )
    
    `)
});

 export function getCounts() {
    db.each("SELECT * FROM visitors", (err, row) => {
        console.log(row);
    })
}

function shutdownDB() {
    getCounts();
    console.log('shutting down db');
    db.close();
}
