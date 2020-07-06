const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes);

server.listen(4000, () => console.log("SERVER ON PORT 4000 ⚡️"));

module.export = server;
