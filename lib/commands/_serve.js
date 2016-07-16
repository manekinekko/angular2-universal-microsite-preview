'use strict';

let child_process = require('child_process');

module.exports = (program, defaultConfig, pkg) => {

  program
    .command('serve')
    .alias('s')
    .description('run a local development server')
    .action((documentName, options) => {

      program.assert.cwd();

      child_process.execSync('npm start', {
        encoding: 'utf-8',
        stdio: [0,1,2]
      });

    });

}
