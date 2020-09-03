var Schema = require("./index");
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
