const Koa = require("koa");
const app = new Koa();
const static = require("koa-static");
const { koaBody } = require("koa-body");
const router = require("./api");

const { openBrowser } = require("./utils/browser");

app.use(
  static(__dirname + "/static", {
    index: false,
    hidden: false,
    defer: true,
  })
);
app.use(
  koaBody({
    multipart: true,
  })
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(8000);

const link = "http://localhost:8000/index.html";
openBrowser(link);
const clickableLink = `\u001b[34m${link}\u001b[34m`;
console.log("Local:   ", clickableLink);
