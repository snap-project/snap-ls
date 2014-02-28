//
// List directory snap plugin
//

var fs = require('fs');
var path = require('path');

function ls(params, cb) {
    var app_name = params[0];
    var root = path.join(this.config.get('apps:dir'), app_name, params[1]);

    fs.readdir(root, cb);
}

function ls_load(Opts, cb) {
    console.log("TOTO");
    // Expose methods to Supervisor over RPC
    this.rpc.expose('dir', 'ls', ls.bind(this));
    console.log("TOTO");

    // Inject client.js to the client
    this.plugins.injectClientSide(__dirname + '/client.js' );
    return cb();
}

module.exports = {
    load: ls_load
}
