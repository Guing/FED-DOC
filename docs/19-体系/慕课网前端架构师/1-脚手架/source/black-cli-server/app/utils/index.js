'use strict';

module.exports = {
  formatName(name) {
    let _name = name;
    if (_name && _name.startsWith('@') && _name.indexOf('/') > 0) {
      const nameArray = _name.split('/');
      _name = nameArray.join('_').replace('@', '');
    }
    return _name;
  },
};