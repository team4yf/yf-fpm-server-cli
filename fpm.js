#!/usr/bin/env node
'use strict';
var path = require('path');
var fs = require('fs');
var unzip = require("unzip");
var program = require('commander');
var _ = require('lodash');
var request = require('request');
var version = require('./package.json').version;


var dir = process.cwd();
var filepath = path.join(dir, 'fpm-starter.zip');

var projname = 'yf-fpm-server-starter-master';

var downloadUrl = 'https://github.com/team4yf/yf-fpm-server-starter/archive/master.zip';

program.version(version);

program.command('init')
    .description('Init the fpm server')
    .action(function(options) {
      console.log('Downloading : ' + downloadUrl);   
      
      //download
      request(downloadUrl)
        .on('response', function(response) {
          if(response.statusCode == 200){
            console.log('Donwload Finished~');
          }else{
            console.log('ERROR! please try again');
          }
        })
        .on('complete', function(){
          console.log('Now You Should Type :  npm(cnpm) i && npm run server ');
          //unzip
          fs.createReadStream(filepath)
            .pipe(unzip.Parse())
            .on('entry', function (entry) {
              var fileName = entry.path;
              var type = entry.type;
              if('Directory' == type){
                return;
              }
              fileName = fileName.replace(projname, '').substr(1);
              entry.pipe(fs.createWriteStream(path.join(dir, fileName)));
            });
        })
        .pipe(fs.createWriteStream(filepath))
    });


program.parse(process.argv);
