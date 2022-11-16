import Log4js from "log4js";

Log4js.configure({
  appenders: {
    consola: { type: "console" },

    dataInfo: { type: "file", filename: "./logsData/dataInfo.log" },
    dataWarn: { type: "file", filename: "./logsData/dataWarn.log" },
    dataError: { type: "file", filename: "./logsData/dataError.log" },

    loggerInfo: { type: "logLevelFilter", appender: "dataInfo", level: "info" },
    loggerWarn: { type: "logLevelFilter", appender: "dataWarn", level: "warn" },
    loggerError: {
      type: "logLevelFilter",
      appender: "dataError",
      level: "error",
    },
  },
  categories: {
    default: { appenders: ["consola"], level: "all" },
    prod: {
      appenders: ["loggerInfo", "loggerWarn", "loggerError"],
      level: "info",
    },
    dev: {
      appenders: ["loggerInfo", "loggerWarn", "loggerError"],
      level: "debug",
    },
  },
});

let logger;

if (process.argv[2] === "PROD") {
  logger = Log4js.getLogger("prod");
} else if (process.argv[2] === "DEV") {
  logger = Log4js.getLogger("dev");
} else {
  logger = Log4js.getLogger("prod");
}

export default logger;
