const fs = require("fs");
const { removeExtension, throwError } = require("genart-lo");
const {
  getInstanceMethodNames,
  getConstructorName,
  METHODS,
} = require("./utils");

const asyncMiddleware =
  (fn) =>
  (...args) => {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };

const validationMiddleware = (req, res, next) => {
  try {
    const { validationResult } = require("express-validator");
    const errors = validationResult(req);
    if (!errors.isEmpty())
      errors.array().map((e) => throwError(e.msg, 200, { param: e.param }));
    return next();
  } catch (err) {
    res.apiError(err, err.message, err.status);
  }
};

class App {
  createServer(options = {}) {
    let app = options.app ? options.app : require("express")();
    app.set("trust proxy", true);

    let middlewares = [require("./api")];

    if (process.env.FIREBASE_CONFIG) {
      middlewares.push(require("helmet")(options.helmet || {}));

      let origin = true;
      middlewares.push(require("cors")({ origin, optionsSuccessStatus: 200 }));
      middlewares.push(require("compression")());

      if (!options.disableLogger) middlewares.push(require("./logger")());

      app.use((req, res, next) => {
        let API_PREFIX = getConstructorName(this).toLowerCase();
        if (req.url.indexOf(`/${API_PREFIX}/`) === 0)
          req.url = req.url.substring(API_PREFIX.length + 1);
        next();
      });
    }

    app.use(...middlewares);

    if (options.fs || options.router) {
      let ignores = ["index.js"];
      if (options.ignore && Array.isArray(options.ignore))
        ignores = ignores.concat(options.ignore);

      fs.readdirSync(options.dirname)
        .filter((el) => !ignores.includes(el))
        .forEach((route) => {
          const Router = require(`${options.dirname}/${route}`);
          app.use("/" + removeExtension(route), new Router());
        });
    }

    if (this.middleware) {
      if (this.middleware.length) app.use(...this.middleware);
      else {
        if (Array.isArray(this.middleware())) app.use(this.middleware());
        else
          throw new Error(
            "middleware must be an array or a function with req, res, and next"
          );
      }
    }

    let params = options.params || [":id"];

    // Named methods
    getInstanceMethodNames(this)
      .filter((method) => !METHODS.includes(method))
      .map((route) => {
        if (this[route]) {
          let validate = this.validate && this.validate[route];
          let methods = [`/${route}/${params.join("/")}`, `/${route}`];
          if (validate)
            methods.forEach((routePath) =>
              app.use(
                routePath,
                this.validate[route],
                validationMiddleware,
                asyncMiddleware(this[route].bind(this))
              )
            );
          else if (route.includes(":"))
            app.use(`/${route}`, asyncMiddleware(this[route].bind(this)));
          else
            methods.forEach((routePath) =>
              app.use(routePath, asyncMiddleware(this[route].bind(this)))
            );
        }
      });

    // Default REST
    METHODS.map((method) => {
      let validate = this.validate && this.validate[method];

      if (options.root || this.constructor.name === "Root") {
        if (validate && this[method])
          app[method](
            ["/:id"],
            this.validate[method],
            validationMiddleware,
            asyncMiddleware(this[method].bind(this))
          );
        else if (this[method])
          app[method](["/:id"], asyncMiddleware(this[method].bind(this)));
      } else {
        let methods = [`/${params.join("/")}`, "/"];
        if (validate && this[method])
          methods.forEach((routePath) =>
            app[method](
              routePath,
              this.validate[method],
              validationMiddleware,
              asyncMiddleware(this[method].bind(this))
            )
          );
        else if (this[method])
          methods.forEach((routePath) =>
            app[method](routePath, asyncMiddleware(this[method].bind(this)))
          );
      }
    });

    return app;
  }
}

module.exports = { App };
