var http = require("http"),
  fs = require("fs");

var post_options = {
  host: "logger.mysite.co.uk",
  path: "/",
  port: 80,
  timeout: 120000,
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

var sender = http.request(post_options, function(res) {
  if (res.statusCode < 399) {
    var text = "";
    res.on("data", function(chunk) {
      text += chunk;
    });
    res.on("end", function(data) {
      console.log(text);
    });
  } else {
    console.log("ERROR", res.statusCode);
  }
});

var POST_DATA = "data={[";
POST_DATA += fs
  .readFileSync("./path/file.log")
  .toString()
  .replace(/\,+$/, "");
POST_DATA += "]}";
console.log(POST_DATA);
sender.write(POST_DATA);
sender.end();
