'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavBarController],
  controllerAs: 'navbarCtrl'
};

function NavBarController($log, $location, $rootScope, authService) {
  $log.debug('NavBarController');

  this.checkPath = function() {
    let path = $location.path();
    if (path === '/join'){
      this.hideButtons = true;
    }

    if (path !== '/join') {
      this.hideButtons = false;
      authService.getToken()
      .catch( () => {
        $location.url('/join#login');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.log('navbarCtrl.logout');
    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };
}
