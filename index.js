"use strict";

const fs = require("fs").promises;
const path = require("path");

const match_ =
  (filename) => {
    return path.extname(filename) === ".html";
  };

/**
 * @name registerPartials
 * @param {Object} hbs
 * @param {String} directory
 * @param {Configuration} opts
 */
const registerPartials =
  async (hbs, directory, match = match_) => {
    const content = await fs.readdir(directory);

    const reads = [];

    for (let i = 0; i < content.length; i++) {
      const filename = content[i];
      if (match(filename)) {
        reads.push(
          fs.readFile(path.resolve(directory, filename), "utf8")
        );
      }
    }

    const partials = await Promise.all(reads);

    for (let i = 0; i < content.length; i++) {
      hbs.registerPartial(content[i], partials[i]);
    }
  };

module.exports = registerPartials;
