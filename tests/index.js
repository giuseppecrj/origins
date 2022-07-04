const { App } = require("../index");

class Playground extends App {
  get(req, res) {
    res.apiResponse();
  }
}

const app = new Playground().createServer();
app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
