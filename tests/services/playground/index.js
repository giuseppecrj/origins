const { App } = require("../../../index");

class Playground extends App {
  get(req, res) {
    res.apiResponse();
  }
}

module.exports = new Playground().createServer();
