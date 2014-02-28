//
// List directory snap plugin
//

var fs = require('fs');
var path = require('path');

function ls(params, cb) {
    var appName = params[0];
    var root = path.join(this.config.get('apps:dir'), appName, params[1]);

    fs.readdir(root, cb);
  }

function lsLoad(opts, cb) {
    // Expose methods to Supervisor over RPC
    this.rpc.expose('dir', 'ls', ls.bind(this));

    // Inject client.js to the client
    this.plugins.injectClientSide(__dirname + '/client.js' );
    return cb();
  }

module.exports = {
    load: lsLoad
  };
