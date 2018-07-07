const express = require("express");
const tus = require("tus-node-server");
const server = new tus.Server();

const fileNameFromUrl = req => {
  return req.url.replace(/\//g, "image");
};

server.datastore = new tus.FileStore({
  path: "/files",
  namingFunction: fileNameFromUrl
});

var app = express();
const uploadApp = express();
uploadApp.all("*", server.handle.bind(server));
app.use("/uploads", uploadApp);
app.listen(8081, "localhost");
