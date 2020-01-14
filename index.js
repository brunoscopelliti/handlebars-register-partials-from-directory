"use strict";

const fs = require("fs").promises;
const path = require("path");

/**
 * @typedef {Object} Configuration
 * @property {Function} match
 * @property {String} prefix
 */

const defaults = {
  match (filename) {
    return path.extname(filename) === ".html";
  },
  prefix: "",
};

/**
 * @name registerPartials
 * @param {Object} hbs
 * @param {String} directory
 * @param {Configuration} opts
 */
const registerPartials =
  async (hbs, directory, opts) => {
    opts = { ...defaults, ...opts };

    const content = (await fs.readdir(directory))
      .filter(opts.match);

    const reads = [];

    for (let i = 0; i < content.length; i++) {
      const filename = content[i];
      reads.push(
        fs.readFile(path.resolve(directory, filename), "utf8")
      );
    }

    const partials = await Promise.all(reads);

    for (let i = 0; i < partials.length; i++) {
      const name = path.parse(content[i]).name;

      hbs.registerPartial(opts.prefix + name, partials[i]);
    }
  };

module.exports = registerPartials;
