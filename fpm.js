#!/usr/bin/env node
'use strict';
var program = require('commander');
var _ = require('lodash');
var version = require('./package.json').version;
var exec = require('child_process').exec;
var cmdStr = 'git clone https://github.com/team4yf/yf-fpm-server-starter.git .';
program.version(version);

program.command('init')
    .description('Init the fpm server')
    .action(function(options) {
      console.log('run command : ' + cmdStr);
      exec(cmdStr, function(err,stdout,stderr){
        if(err) {
          console.log('get error:' + stderr);
        } else {
          console.log('Init the server code success!\n you shoud run: npm i && npm start');
        }
      });
    });
program.parse(process.argv);
