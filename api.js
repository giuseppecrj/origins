module.exports = (req, res, next) => {
  res.apiResponse = (data) => {
    const response = Object.assign({ success: true }, data);
    req.query.callback ? res.jsonp(response) : res.json(response);
  };

  res.apiError = (err, msg, code) => {
    msg = msg || "Unknown error";
    console.error(err);
    res.status(code || 500);
    res.apiResponse({ success: false, message: msg || "error", detail: err });
  };

  res.apiNotFound = (err, msg) => {
    res.apiError(err, msg || "missing: data not found", 404);
  };

  res.apiNotAllowed = (err, msg) => {
    res.apiError(err, msg || "error: access not allowed", 403);
  };

  res.sseResponse = (data) => {
    if (res.getHeader("Content-Type") !== "text/event-stream") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      });
    }

    res.write(data);
    res.flush();
  };

  next();
};
