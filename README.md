# handlebars-register-partials-from-directory

Register all the view in a given directory as Handlebars partials.

Coverage 100%.

## Install

```bash
npm i -S handlebars-register-partials-from-directory
```

## Example

```js
const Handlebars = require("handlebars");
const register = require("handlebars-register-partials-from-directory");

await register(Handlebars, "path/to/partials");
```

### Options

- `string` prefix

- `function` match {filename -> bool}
