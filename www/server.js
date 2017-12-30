// content of index.js
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { exec } = require("child_process");

const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const PORT = 8080;

const mimeTypes = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  // Media
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  // Fonts
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

// Async is the best hooray
async function serve(req, res) {
  let pathname = path.join(__dirname, url.parse(req.url).pathname);
  let data, stats;

  try {
    // Get if we're trying to get a directory
    let extname = path.extname(pathname);

    /*if(extname === "") {
      pathname += ".html";
      extname = ".html";
    }*/

    stats = await stat(pathname);
    if (stats.isDirectory()) {
      pathname += "index.html";
      extname = ".html";
      
      stats = await stat(pathname);
    }

    const mime = mimeTypes[extname] || "text/plain";
    data = await readFile(pathname);

    // Set response headers
    res.setHeader("Content-Type", mime);
    res.setHeader("Content-Length", stats.size);
  } catch (ex) {
    // File was not found or general server error   
    res.statusCode = ex.code === "ENOENT" ? 404 : 500; 
    console.error(`${res.statusCode}: ${pathname}`);
  }

  return data;
}

const server = http.createServer((req, res) => {
  serve(req, res).then(data => res.end(data));
});
server.listen(PORT, err => {
  if (err) {
    return console.log("Server did a dumdum", err);
  }

  console.log(`Server is listening on ${PORT}`);
});