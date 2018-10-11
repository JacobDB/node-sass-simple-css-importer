// JavaScript Document

module.exports = css_importer;

const FS   = require("fs");
const GLOB = require("glob");
const PATH = require("path");

function css_importer() {
    return function (url, prev, done) {
        const EXT    = PATH.extname(url);
        const FOLDER = PATH.dirname(url);
        const FILE   = PATH.basename(url, EXT);
        const PREV   = PATH.dirname(prev);

        // ensure the imported file isn't remote, doesn't have an extension specified, or is a .css file
        if (!url.match(/^https?:\/\//) && (EXT === "" || EXT === "css")) {
            // build out glob pattern based on PREV and includePaths
            const INCLUDE_PATHS = "{" + PREV + "," + this.options.includePaths.replace(new RegExp(/:/g), ",") + "}";

            // try to find a matching file
            const GLOBBED = GLOB.sync(INCLUDE_PATHS + "/" + FOLDER + "/" + FILE + ".css");

            // ensure only one result was matched; let node-sass handle the "It's not clear" error
            if (GLOBBED.length === 1) {
                // return the contents of the imported file
                return done({contents: FS.readFileSync(GLOBBED[0], "utf8")});
            }
        }

        return done();
    }
}
