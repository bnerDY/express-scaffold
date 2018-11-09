module.exports = ((prod, paypal) => {
  let dbServer = prod
    ? ""
    : "127.0.0.1";
  let dbPort = prod ? "9050":"27017";
  let schema = "application";

  let config = {
    prod: prod,
    app: {
      port: 30001,
      secret: "secret"
    },
    db: {
      url: dbServer,
      port: dbPort,
      schema: schema,
      user: "",
      password: "",
      poolSize: paypal ? 1 : 25
    },
    log: {
      DailyRotateFile: {
        enabled: true,
        level: "info",
        filename: "mon-%DATE%.log",
        handleExceptions: true,
        dirname: "./logs",
        maxSize: "20m",
        maxFiles: "15d",
        datePattern: "YYYY-MM-DD",
        json: true,
        colorize: false
      },
      Console: {
        enabled: true,
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true
      }
    },
    cache: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      length: (n, key) => {
        return n * 2 + key.length;
      }
    }
  };
  return config;
})(process.argv.indexOf("prod") !== -1, process.argv.indexOf("paypal") !== -1);
