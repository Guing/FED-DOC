let less = require('less');
module.exports = function (source) {
     let css = '';
     less.render(source, function (err, c) {
          css = c.css;
     });
     css = css.replace(/\n/g, '\\n');
     return  JSON.stringify(css);

}