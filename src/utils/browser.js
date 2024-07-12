const { exec } = require("child_process");
const os = require("os");

exports.openBrowser = function (url) {
  let type = os.platform();
  switch (type) {
    case "win32":
      exec(`start ${url}`);
      break;
    case "darwin":
      exec(`open ${url}`);
      break;
    default:
      exec(`xdg-open ${url}`);
  }
};
