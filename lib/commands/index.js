'use strict';

let fs = require('fs-extra');

module.exports = (defaultConfig) => {

  let program = require('commander');
  let colors = require('colors');
  let path = require('path');
  let pkg = require(path.resolve(__dirname, '../../', './package.json'));

  program.version(pkg.version);

  program.assert = {
    cwd: (options) => {

      options = options || {};
      options.assertNegate = options.assertNegate || false;

      let exit = () => {
        let message = colors.red('You must run this command inside an "ngu" project.');
        if(options.assertNegate === true) {
          message = colors.red('You can not run this command inside an existing "ngu" project.')
        }
        console.error(message);
        process.exit(1);
      };

      let configfile = path.join(process.cwd(), defaultConfig.configfile);

      // 1st check
      let check = fs.existsSync(configfile);
      check = (options.assertNegate === true) ? check : !check;
      if(check) {
        exit();
      }

      // 2nd check
      try {
        configfile = fs.readJsonSync(configfile);
        check = (!configfile || configfile.version !== pkg.version);
        check = (options.assertNegate === true) ? !check : check;
        if(check) {
          exit();
        }
      }
      catch(e) {
        // passthrough
      }

    },
    project: (projectName) => {
      let exit = (projectName) => {
        console.error(colors.red(`A project "${projectName}" already exists. Abort.`));
        process.exit(1);
      };

      let projectPath = path.join(process.cwd(), projectName);
      if(fs.existsSync(projectPath)) {
        exit(projectName);
      }
    }
  };

  // register sub-commands
  ['new', 'generate', 'serve'].map( (command) => {
    return require(`./_${command}`)(program, defaultConfig, pkg);
  });

  program.parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp( (txt) => colors.red(txt) );
  }

}
