import * as ws from "ws";

const port = (process.env.PORT || 80) as number;

const wsi = new ws.Server({port});

wsi.on("connection", function connection(server) {
  server.on("message", (message) => {
    console.log(`<<< ${message}`);
    const data = JSON.stringify({data: {msg: "ACK"}});
    server.send(data);
    console.log(`>>> ${data}`);
  });
  console.log("    connection established");
});

console.log("    Websocket server started");
