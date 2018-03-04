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

function color(key, str) {
  const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",

    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m"
  };

  const value = colors[key];
  if(value) {
    return `${value}${str}${colors.reset}`;
  }
  return str;
}

/*async function serveFile(res, path) {
  let pathname = path.join(__dirname, path);
  let data = null;

  try {
    let extname = path.extname(pathname);
    let stats = await stat(pathname);

    // Get if we're trying to get a directory
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
    return data;
  } catch (ex) {
    // File was not found or general server error   
    res.statusCode = ex.code === "ENOENT" ? 404 : 500;
    console.error(`${res.statusCode}: ${pathname}`);
    return 
  }
  return ex.code === "ENOENT" ? 404 : 500;
}*/

// Async is the best hooray
async function serve(req, res) {
  let data, pathname = path.join(__dirname, url.parse(req.url).pathname);

  // parse routes here
  if(req.url.startsWith("/demo/")) {
    pathname = __dirname + "\\index.html";
  }

  try {
    let extname = path.extname(pathname);
    let stats = await stat(pathname);

    // Get if we're trying to get a directory
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
  }

  return { data, path: pathname };
}

const server = http.createServer((req, res) => {
  serve(req, res).then(({data, path}) => {
    res.end(data);

    let clr = "white";
    if(res.statusCode >= 200 && res.statusCode < 300) {
      clr = "green";
    } else if(res.statusCode >= 300 && res.statusCode < 400) {
      clr = "blue";
    } else if(res.statusCode >= 400 && res.statusCode < 500) {
      clr = "yellow";
    } else if(res.statusCode >= 500) {
      clr = "red";
    }
    console.log(color(clr, res.statusCode) + `: ${req.url}`);
  });
});
server.listen(PORT, err => {
  if (err) {
    return console.log("Server did a dumdum", err);
  }

  console.log(`Server is listening on ${PORT}`);
});