const _ = require("lodash");

class Schema {
  constructor(id, title, draft) {
    this.scmemas = {};
    this.current = "";
    this.schema  = "query";
    this.keyword = "";
    id ? this.id(id) : null;
    this.draft(draft || "07");
    title ? this.title(title) : null;
  }

  //stands
  draft = (v) => _.set(this, "scmemas.$schema", `http://json-schema.org/draft-0${v}/schema`);
  title = (v) => _.set(this, "scmemas.title", v);
  id    = (v) => _.set(this, "scmemas.$id", v);

  //set fastify schema [body,query,params,headers]
  setKeyword = opt => {
    var {schema, keyword, type = "string", ...others} = opt;

    this.schema  = schema || this.schema;
    this.keyword = keyword;
    _.set(this.scmemas, _.compact([this.schema, this.keyword]), {type, ...others});   //设置对象
    return this;
  }

  //stand method
  body    = (keyword, opt) => this.setKeyword({schema: "body", keyword, ...opt})
  query   = (keyword, opt) => this.setKeyword({schema: "query", keyword, ...opt})
  params  = (keyword, opt) => this.setKeyword({schema: "params", keyword, ...opt})
  headers = (keyword, opt) => this.setKeyword({schema: "headers", keyword, ...opt})

  //required
  required        = (schema, ...items) => {
    _.set(this.scmemas, [schema, "required"], [...items]);
    return this;
  }
  requiredBody    = (...items) => this.required("body", ...items);
  requiredHeaders = (...items) => this.required("headers", ...items);
  requiredParams  = (...items) => this.required("params", ...items);
  requiredQuery   = (...items) => this.required("query", ...items);

  //set jonsSchema keyword
  item = (_keyword, opt) => {
    var reg = /^(([a-z]+)\.)?([^$]+)$/ig
    if(reg.test(_keyword)) {
      var {$2: schema, $3: keyword} = RegExp;
      return this.setKeyword({schema, keyword, ...opt})
    }
    return this.setKeyword({schema: this.schema, keyword: _keyword, ...opt});
  }

  //setProperties
  setProperties = (p, v) => {
    _.set(this.scmemas, [this.schema, this.keyword, p], v);
    return this;
  }
  //setProperties=type
  type          = (k, v) => this.setProperties("type", k, v);
  array         = () => this.setProperties("type", "array");
  boolean       = () => this.setProperties("type", "boolean");
  string        = () => this.setProperties("type", "string");
  int           = () => this.setProperties("type", "integer");
  enum          = (...enums) => this.setProperties("enum", enums);
  reg           = (regexp) => {
    if(!_.isRegExp(regexp)) throw new Error("schema.reg is not RegExp")
    var type    = "string"
    var pattern = regexp.toString().replace(/((^\/)|(\/([ig]*))$)/ig, "");
    this.setProperties("type", type);
    return this.setProperties("pattern", pattern);
  }

  //ext function
  email    = () => this.reg(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ig);
  alphanum = () => this.reg(/^[a-z0-9]+$/ig);

  //error
  error = (message) => this.setProperties("errorMessage", message);

  //get value
  value = () => {
    var {current, ...options} = this.scmemas
    return this.scmemas;
  }
}

module.exports = Schema;
