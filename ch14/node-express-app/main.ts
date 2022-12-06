import express from "express";
import config from "config";
import * as Index from "./routes/index";
import * as Login from "./routes/login";

const app = express();
enum ConfigOptions {
  PORT = "port",
}

let port = 3001;
if (config.has(ConfigOptions.PORT)) {
  port = config.get(ConfigOptions.PORT);
} else {
  console.log(`no port config found, using default ${port}`);
}

app.use("/", Index.router);
app.use("/", Login.router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
