//
// List directory snap plugin
//

var fs = require('fs');
var path = require('path');
var mime = require('mime');

function ls(params, cb) {
    var appName = params[0];
    var root = path.join(this.config.get('apps:dir'), appName);
    var filepath = path.join(root, params[1])

    if (path.relative(root, filepath).indexOf('..') !== -1){
        return cb(new Error("You are trying to list a forbiden directory"))
    }
    else {
        fs.exists(filepath, function (exists) {
            if (exists) {
                fs.readdir(filepath, cb)
            } else {
                return cb(new Error("Directory is missing " + filepath ))
            }
        })
    }
}

function lsImages(params, cb) {
    var appName = params[0];
    var root = path.join(this.config.get('apps:dir'), appName);
    var filepath = path.join(root, params[1])

    if (path.relative(root, filepath).indexOf('..') !== -1){
        return cb(new Error("You are trying to list a forbiden directory"))
    }
    else {
        fs.exists(filepath, function (exists) {
            if (exists) {
                fs.readdir(filepath, function (err, files) {
                    files = files.filter(function (element){
                        if (mime.lookup(element) === "image/jpeg") {
                            return true;
                        }
                        if (mime.lookup(element) === "image/png") {
                            return true;
                        }
                    });
                    return cb(null, files);
                })
            } else {
                return cb(new Error("Directory is missing " + filepath ))
            }
        });
    }
}

function lsLoad(opts, cb) {
    // Expose methods to Supervisor over RPC
    this.rpc.expose('dir', 'ls', ls.bind(this));
    this.rpc.expose('dir', 'lsImages', lsImages.bind(this));

    // Inject client.js to the client
    this.plugins.injectClientSide(__dirname + '/client.js' );
    return cb();
  }

module.exports = {
    load: lsLoad
  }
