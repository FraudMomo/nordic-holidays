import "./chunk-VM2JCVBB.mjs";

// package.json
var name = "nordic-holidays";
var version = "1.0.6";
var main = "./dist/nordic-holidays.js";
var module = "./dist/nordic-holidays.mjs";
var types = "./dist/nordic-holidays.d.ts";
var exports = {
  ".": {
    require: "./dist/nordic-holidays.js",
    import: "./dist/nordic-holidays.mjs"
  }
};
var devDependencies = {
  "@types/semver": "^7.5.8",
  axios: "^1.7.7",
  mocha: "^10.7.3",
  tsup: "^8.2.4",
  typescript: "^5.5.4"
};
var scripts = {
  build: "tsup src/nordic-holidays.ts --format cjs,esm --dts --clean --dts-resolve",
  "clean:mts": "find dist -name '*.d.mts' -type f -delete",
  postbuild: "npm run clean:mts",
  test: "mocha 'tests/**/*.js'"
};
var repository = {
  type: "git",
  url: "git+https://github.com/FraudMomo/nordic-holidays.git"
};
var keywords = [
  "javascript",
  "typescript",
  "nordic",
  "holidays"
];
var author = "FraudMomo";
var license = "MIT";
var bugs = {
  url: "https://github.com/FraudMomo/nordic-holidays/issues"
};
var homepage = "https://github.com/FraudMomo/nordic-holidays#readme";
var description = "";
var dependencies = {
  boxen: "^8.0.1",
  chalk: "^5.3.0",
  "package-json": "^10.0.1",
  semver: "^7.6.3",
  "semver-diff": "^4.0.0"
};
var package_default = {
  name,
  version,
  main,
  module,
  types,
  exports,
  devDependencies,
  scripts,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  description,
  dependencies
};
export {
  author,
  bugs,
  package_default as default,
  dependencies,
  description,
  devDependencies,
  exports,
  homepage,
  keywords,
  license,
  main,
  module,
  name,
  repository,
  scripts,
  types,
  version
};
