'use strict';

const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const path = require('path');
const uiRouter = require('angular-ui-router');
const ngTouch = require('angular-touch');
const ngAnimate = require('angular-animate');

require('./scss/main.scss');

const cfgram = angular.module('cfgram', [ngTouch, ngAnimate, uiRouter]);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( key => {
  cfgram.config(context(key));
});

context = require.context('./view/', true, /\.js$/);
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'));
  let module = context(key);
  console.log('view:', key, name, module);
  cfgram.controller(name, module);
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => {
  console.log('service:', key);
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  console.log('service', key, name, module);
  cfgram.service(name, module);
});

context = require.context('./component/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  console.log('component:', key, name, module);
  cfgram.component(name, module);
});
