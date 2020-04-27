function defaultTask(cb) {
    // place code for your default task here
    cb();
  }

  exports.default = defaultTask

  // The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
  // body omitted
  cb();
}

exports.build = build;
exports.default = series(clean, build);