var Ajv = require('ajv');

var ajv = new Ajv(); // 可以传入配置项, 例如： {allErrors: true}

var schema = {
    type:"integer"
}
var data = 123;

var validate = ajv.compile(schema);
var valid = validate(data);
if (!valid) console.log(validate.errors);