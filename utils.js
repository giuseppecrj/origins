let http = require("http");

function getInstanceMethodNames(obj) {
  const names = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
  return names.filter(
    (name) =>
      typeof obj[name] === "function" &&
      name !== "constructor" &&
      name !== "middleware"
  );
}

function getCurrentNodeMethods() {
  return (
    http.METHODS &&
    http.METHODS.map(function lowerCaseMethod(method) {
      return method.toLowerCase();
    })
  );
}

function getBasicNodeMethods() {
  return [
    "get",
    "post",
    "put",
    "head",
    "delete",
    "options",
    "trace",
    "copy",
    "lock",
    "mkcol",
    "move",
    "purge",
    "propfind",
    "proppatch",
    "unlock",
    "report",
    "mkactivity",
    "checkout",
    "merge",
    "m-search",
    "notify",
    "subscribe",
    "unsubscribe",
    "patch",
    "search",
    "connect",
  ];
}

const METHODS = getCurrentNodeMethods() || getBasicNodeMethods();

function getConstructorName(obj) {
  if (!obj) return obj;
  return (
    obj.constructor.name ||
    obj.constructor.toString().match(/function ([^\(]+)/)[1]
  );
}

module.exports = {
  getInstanceMethodNames,
  getConstructorName,
  METHODS,
};
