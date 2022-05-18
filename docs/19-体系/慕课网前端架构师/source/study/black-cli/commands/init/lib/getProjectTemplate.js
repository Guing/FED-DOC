const request = require('@black-cli/request')

module.exports = function(){
    return request({
        url:'/project/template'
    })
}