# handlebars-register-partials-from-directory

Register all the view in a given directory as Handlebars partials.

Coverage 100%.

## Example

```js
const Handlebars = require("handlebars");
const register = require("handlebars-register-partials-from-directory");

await register(Handlebars, "path/to/partials");
```
