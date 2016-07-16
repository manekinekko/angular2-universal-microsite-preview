'use strict';

let fs = require('fs-extra');
let path = require('path');
let colors = require('colors');
let child_process = require('child_process');
let templateFiles = path.resolve(__dirname, '../../', 'template');

module.exports = (program, defaultConfig, pkg) => {

  program
    .command('new <project-name>')
    .alias('n')
    .option('-snpm,--skipNpm,', 'Skip installing NPM dependencies')
    .description('scaffold a new documentation project')
    .action((projectName, options) => {

      program.assert.project(projectName);
      program.assert.cwd({
        assertNegate: true
      });

      console.log(colors.cyan(`Scaffolding Universal application "${projectName}"...`));

      let projectDir = path.join(process.cwd(), projectName);
      let configfile = path.join(projectDir, defaultConfig.configfile);

      // create project folder
      fs.ensureDirSync(projectDir);

      // copy starter files
      fs.copySync(templateFiles, projectName, {
        filter: (file) => {
          console.log('   generating', colors.green(file.replace(`${templateFiles}/`, '')));
          return true;
        }
      });

      // update config information
      let configfileObj = fs.readJsonSync(configfile);
      configfileObj.version = pkg.version;
      configfileObj.documentation = defaultConfig.documentation;
      fs.writeJsonSync(configfile, configfileObj);

      // create documentation folder (based on config)
      fs.ensureDirSync(path.join(projectDir, '/', configfileObj.documentation));

      if(!options['skipNpm']) {
        console.log(colors.cyan(`Installing NPM dependencies...`));

        // run npm install
        child_process.execSync('npm install', {
          cwd: projectDir,
          encoding: 'utf-8',
          stdio: [0,1,2]
        });
      }


      // Change directory (not working??)
      // process.chdir(projectName);

    });

}
