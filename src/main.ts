import * as ws from "ws";

const wsi = new ws.Server({port: 6655});  // 114514 is not a valid port

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
