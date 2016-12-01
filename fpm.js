#!/usr/bin/env node
'use strict';
var program = require('commander');
var _ = require('lodash');
var version = require('./package.json').version;
var exec = require('child_process').exec;
var cmdStr = 'git clone https://github.com/team4yf/yf-fpm-server-starter.git';
program.version(version);

program.command('install')
    .description('Install the fpm server')
    //.option('-a, --all', 'Whether to display hidden files')
    .action(function(options) {
      console.log('ready to install the project');
      console.log('run command : ' + cmdStr);
      exec(cmdStr, function(err,stdout,stderr){
        if(err) {
          console.log('get error:' + stderr);
        } else {
          console.log('clone the project success, you shoud cd the project dir:cd yf-fpm-server-starter && npm i ');
        }
      });
    });
    program.command('run')
        .description('Run the fpm server')
        //.option('-a, --all', 'Whether to display hidden files')
        .action(function(options) {
          exec('npm run server', function(err,stdout,stderr){
            if(err) {
              console.log('get error:' + stderr);
            } else {
              console.log('run the project');
            }
          });
        });
program.parse(process.argv);
