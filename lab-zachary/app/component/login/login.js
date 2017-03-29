'use strict';

require('./_login.scss');

module.exports = {
  template: require('./login.html'),
  controller: ['$log', LoginController],
  controllerAs: 'loginCtrl'
};

function LoginController($log) {
  $log.debug('LoginController');

}
