# smartify-schema

JsonSchema for Fastify

## Useage
```javascript

var Schema = require("smartify-schema");

var schema = new Schema("common.js", "base schema")
.body("username").reg(/^\d+$/ig).error("abc")
.query("email").email().error("message")
.item("body.id").string().error("abc")
.headers("string").string().error("abc")
.item("boolean").boolean().error("abc")
.item("headers.enum").enum(1, 2, 3, 4, 5).error("abc")
.requiredBody("body", "bbc")
.requiredHeaders("body", "bbc")
.value()


console.log(schema)

```

```json5

{
  '$id': 'common.js',
  '$schema': 'http://json-schema.org/draft-007/schema',
  title: 'base schema',
  body: {
    username: { type: 'regexp', pattern: '^\\d+$', errorMessage: 'abc' },
    id: { type: 'string', errorMessage: 'abc' },
    required: [ 'body', 'bbc' ]
  },
  query: {
    email: {
      type: 'regexp',
      pattern: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
      errorMessage: 'message'
    }
  },
  headers: {
    string: { type: 'string', errorMessage: 'abc' },
    boolean: { type: 'boolean', errorMessage: 'abc' },
    enum: { type: 'string', enum: [], errorMessage: 'abc' },
    required: [ 'body', 'bbc' ]
  }
}

```


