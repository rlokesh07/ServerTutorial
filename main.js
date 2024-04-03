// main.js
import { numClients } from "./index-ws.js";

let ws;
const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
ws = new WebSocket(`${proto}://${window.location.host}`);

ws.onmessage = (event) => {
    console.log(event.data);
    document.getElementById("visitors").innerHTML = numClients.toString();
};
