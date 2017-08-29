// figure out what set of credentials to return.

if (process.env.NODE_ENV === 'production') {
  // app is production use the set of production keys here
  module.exports = require('./prod');
} else {
  // we are in production use the set of development keys here
  module.exports = require('./dev');
}