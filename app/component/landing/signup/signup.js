'use strict';

require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService) {
  $log.debug('SignupController');

  authService.getToken()
  .then( token => {
    $log.debug('authService: ', token);
    $location.url('/home');
  });

  this.signup = function(user) {
    $log.debug('SignupController.signup');

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    });
  };
}