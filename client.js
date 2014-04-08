function appListHook(args) {
  // Retrieve current app
  var currentApp = this.getCurrentApp();
  // Insert current app into arguments
  args.splice(2, 0, currentApp);
}

supervisor.bridge('dir', 'ls', appListHook);
supervisor.bridge('dir', 'lsJPG', appListHook);
