#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const nodemon = require('nodemon');

process.env.CLI_PATH = path.join(__dirname, '..');
process.env.APP_PATH = process.cwd();
process.env.APP_MOCK_PATH = path.join(process.cwd(), 'mock');

start(program);
program
.command('start')
.description('run mock start command')
.action((cmd) => {
    nodemon({
        script: `${process.env.CLI_PATH}/lib/index.js`
    }).on('start', function () {
        console.log('nodemon started');
    }).on('crash', function () {
        console.log('script crashed for some reason');
    });
});
end(program);

function start(program) {
    program
    .version(require('../package').version);
    // .usage('<command> [options]');
};

function end(program) {
    program.parse(process.argv);
    if (program.args.length === 0) {
        program.help();
    }
};
