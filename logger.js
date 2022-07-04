const morgan = require("morgan");

module.exports = () => {
  if (process.env.NODE_ENV === "development" || process.env.FIREBASE_CONFIG)
    return morgan("dev");

  morgan.token("id", function (req) {
    return req.id;
  });

  // eslint-disable-next-line quotes
  const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

  return [
    morgan(loggerFormat, {
      skip: (req, res) => res.statusCode >= 400,
      stream: process.stdout,
    }),
    morgan(loggerFormat, {
      skip: (req, res) => res.statusCode < 400,
      stream: process.stderr,
    }),
  ];
};
