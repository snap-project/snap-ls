//
// List directory snap plugin
//

var fs = require('fs');
var path = require('path');

function ls(params, cb) {
    var appName = params[0];
    var root = path.join(this.config.get('apps:dir'), appName);
    var filepath = path.join(root, params[1])

    if (path.relative(root, filepath).indexOf('..') !== -1){
        return cb(new Error("You are trying to list a forbiden directory"))
    }
    else {
        try {
            fs.readdir(filepath, cb);
        }
        catch (e) {
            logMyErrors(e);
            return cb(new Error("Missing directory"))
        }
    }

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
  }
