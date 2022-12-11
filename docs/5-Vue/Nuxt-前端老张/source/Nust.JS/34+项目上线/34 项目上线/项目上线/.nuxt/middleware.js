const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['each'] = require('../middleware/each.js')
middleware['each'] = middleware['each'].default || middleware['each']

export default middleware
