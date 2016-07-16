'use strict';

let path = require('path');
let colors = require('colors');
let fs = require('fs-extra');

module.exports = (program, defaultConfig, pkg) => {

  program
    .command('generate <doc-name>')
    .alias('g')
    .description('create a new documentation file')
    .action((documentName, options) => {

      program.assert.cwd();

      let documentPath = path.join(process.cwd(), defaultConfig.documentation, `${documentName}.md`);

      // create the file
      fs.outputFileSync(documentPath, `
# Angular2 Universal Documentation
## ${documentName}
      `);

      let filename = path.resolve(defaultConfig.documentation, `${documentName}.md`);

      console.log('   generating', colors.cyan(filename));

    });

}
