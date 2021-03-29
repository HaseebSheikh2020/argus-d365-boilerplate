/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const spawn = require("cross-spawn");
const fs = require("fs");

const checkForPublisher = (publisherPath) => {
  if (!fs.existsSync(publisherPath)) {
    // eslint-disable-next-line no-undef
    console.error(`Publisher EXE does not exist on path: ${publisherPath}`);
    return false;
  }
  return true;
};

class WebResourcePublisherPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap("WebResourcePublisherPlugin", function (compilation) {
      setTimeout(() => {
        console.log("Build finished at: " + new Date().toLocaleTimeString());
        if (compilation.errors != null && compilation.errors.length > 0) {
          return;
        } else {
          const publisherPath = process.env.PUBLISHER_EXE;
          const publisherConfig = process.env.PUBLISHER_CONFIG_NAME;

          if (!publisherPath || !publisherConfig)
            console.error("publisherPath or publisherConfig not provided");

          if (!checkForPublisher(publisherPath)) return;

          console.log("publisherPath", publisherPath);
          console.log("publisherConfig", publisherConfig);

          const unsupportedFiles = ["json", "txt"];
          const assets = Object.keys(compilation.assets).filter(
            (asset) => !unsupportedFiles.includes(asset.split(".").pop())
          );

          console.log("assets to deploy", assets);
          spawn(publisherPath, [`deploy`, `-c ${publisherConfig}`, `-w ${assets}`], {
            cwd: process.cwd(),
            stdio: "inherit",
          });
        }
      }, 1000);
    });
  }
}

module.exports = WebResourcePublisherPlugin;
