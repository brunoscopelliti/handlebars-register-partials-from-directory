/* eslint-env jest */

"use strict";

const path = require("path");

const registerPartials = require("./");

const Handlebars = {
  partials: {},
  clear () {
    this.partials = {};
  },
  registerPartial (name, partial) {
    this.partials[name] = partial;
  },
};

beforeEach(
  () => {
    Handlebars.clear();
  }
);

test("registerPartials", async () => {
  await registerPartials(Handlebars, path.resolve(__dirname, "fixtures"));

  expect(Handlebars.partials).toEqual({
    foo: "This is foo. Yay!",
    bar: "This is bar... it sucks :(",
  });
});

test("registerPartials / custom matcher", async () => {
  const match =
    (filename) => {
      return filename === "foo.html";
    };

  await registerPartials(Handlebars, path.resolve(__dirname, "fixtures"), { match });

  expect(Handlebars.partials).toEqual({
    foo: "This is foo. Yay!",
  });
});

test("registerPartials / with prefix", async () => {
  await registerPartials(Handlebars, path.resolve(__dirname, "fixtures"), { prefix: "layouts/" });

  expect(Handlebars.partials).toEqual({
    "layouts/foo": "This is foo. Yay!",
    "layouts/bar": "This is bar... it sucks :(",
  });
});
