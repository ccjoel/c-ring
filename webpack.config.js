module.exports = {
    entry: "./app/scripts/main.js",
    mode: "development", // "production" for prod build
    output: {
        path: __dirname + "/www/scripts",
        filename: "bundle.js"
    }
};
