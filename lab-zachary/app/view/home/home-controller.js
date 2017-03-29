'use strict';

require('./_home.scss');

module.exports = ['$log','$location', 'authService', HomeController];

function HomeController($log, $location, authService) {
  $log.debug('HomeController');


  authService.getToken()
  .then( () => {
  })
  .catch( err => {
    $log.error('HomeController: ', err);
    $location.url('');
  });
}