const _fs = require("fs");
const _path = require("path");
const _http = require("http");
const express = require("express");
const static = require("./static");
const { throwError, fileExt } = require("genart-lo");

const app = express();

function findServices({ services, prefix }) {
  let path = _path.resolve(services);
  let serviceFiles = _fs.readdirSync(path);

  serviceFiles
    .filter((el) => !el.startsWith("."))
    .filter((el) => el !== "index.js")
    .sort((name) => {
      if (name === "root") return 1;
      else return -1;
    })
    .map((directory) => {
      import(_path.join(path, directory, "index.js")).then(
        ({ default: route }) => {
          if (!route) return;
          if (typeof route !== "function") {
            if (route.socket) return;
            let type = toString.call(route);
            let msg = `Route.${directory}() requires a callback function but got ${type}`;
            throw new Error(msg);
          }

          if (directory === "root") {
            app.all("*", route);
          }

          if (prefix) app.use(`/${prefix}/${directory}`, route);
          else app.use(`/${directory}`, route);
        }
      );
    });

  return app;
}

function addStatic({ static: staticPaths }) {
  if (typeof staticPaths === "string") {
    staticPaths = [staticPaths];
  }

  if (Array.isArray(staticPaths)) {
    staticPaths.map((value) => {
      let split = value.split("static");
      let path = split[split.length - 1];

      if (!path) {
        app.use(static(value, { brotli: true }));
      } else {
        if (fileExt(value)) {
          // send file
          app.use(path, (req, res) => res.sendFile(_path.resolve(value)));
        } else {
          // send directory
          app.use(path, static(_path.resolve(value), { brotli: true }));
        }
      }
    });
  }
}

function addMiddleware({ middlewares }) {
  if (!Array.isArray(middlewares))
    throw new Error("middleware options must be an array");
  middlewares.map((middleware) => app.use(middleware));
}

function addHealthcheck(router) {
  router.get("/ping", (req, res) => res.status(200).send("pong"));
}

function init(options) {
  // add external plugins
  if (options.middlewares) addMiddleware({ middlewares: options.middlewares });

  // add static folders
  if (options.static) addStatic({ static: options.static });

  // add services folder
  let services = app;

  if (options.services)
    services = findServices({
      services: options.services,
      prefix: options.prefix,
    });

  addHealthcheck(services);

  let port = normalizePort(process.env.PORT);
  let server = _http.createServer(services);

  if (options.sockets) {
    if (!_fs.lstatSync(options.sockets).isDirectory())
      throwError("path must be a directory");

    const ws = require("./ws");
    ws.init({
      server,
      services: options.sockets,
    });
    server.websockets = true;
  }

  server.listen(port);
  server.on("error", onError(port));
  server.on("listening", onListening(server));
}

function cluster(options) {
  const cluster = require("cluster");
  const numCPUs = require("os").cpus().length;

  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", function (worker) {
      console.log("worker " + worker.process.pid + " died");
    });
  } else {
    init(options);
  }
}

function normalizePort(val) {
  let port = typeof val === "string" ? parseInt(val, 10) : val;
  if (port && isNaN(port)) return port;
  else if (port >= 0) return port;
  else return 3000;
}

function onListening(server) {
  return () => {
    let addr = server.address();
    let host = addr.address === "::" ? "localhost" : addr.host;
    let bind = typeof addr === "string" ? `${addr}` : `${addr.port}`;

    // Server
    console.log("Time: ", new Date());
    console.log("Environment: " + process.env.NODE_ENV || "development");
    console.log("Process PID: " + process.pid);
    console.log("Node Version: " + process.version);
    console.log("To shut down your server, press <CTRL> + C at any time\n");
    console.log(`⚡️ Server: http://${host}:${bind}`);

    if (server.websockets) console.log(`⚡️ Websocket: ws://${host}:${bind}`);
  };
}

function onError(port) {
  return (error) => {
    if (error.syscall !== "listen") throw error;
    let bind =
      typeof port === "string" ? `Pipe ${port}` : `Port ${port.toString()}`;

    console.log(`⛔️ Server wasn't able to start properly.`);

    switch (error.code) {
      case "EACCES":
        console.error(`${bind} requires elevated privileges`);
        return process.exit(1);
      case "EADDRINUSE":
        console.error(`${bind} is already in use`);
        return process.exit(1);
      default:
        throw error;
    }
  };
}

module.exports = {
  findServices,
  init,
  cluster,
};
