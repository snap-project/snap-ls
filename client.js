function appListHook(args) {
  // Retrieve current app
  var currentApp = this.getCurrentApp();
  // Insert current app into arguments
  args.splice(2, 0, currentApp);
}

console.log("Client.js 1")
supervisor.bridge('dir', 'ls', appListHook);
