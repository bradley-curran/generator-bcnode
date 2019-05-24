const Generator = require('yeoman-generator');

module.exports = exports = class extends Generator {
  create() {
    this.fs.copy(this.sourceRoot(), this.destinationRoot(), {
      globOptions: { dot: true }
    });
  }
};
