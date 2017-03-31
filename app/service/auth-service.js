'use strict';

module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window) {
  $log.debug('authService');

  let service = {};
  let token = null;

  function setToken(_token){
    $log.debug('authService.setToken');

    if (! _token) {
      return $q.reject(new Error('no token bro'));
    }

    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }

  service.signup = function(user) {
    $log.debug('authService.signup');

    let url = `${__ARP_URL__}/api/signup`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    return $http.post(url, user, config)
    .then( res => {
      $log.log('success:', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error('failure:', err.message);
      return $q.reject(err);
    });

  };

  service.logout = function(){
    $log.debug('authService.logout');

    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };

  service.login = function(user){
    $log.debug('authService.login');

    let url = `${__API_URL__}/api/login`;
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      }
    };
    return $http.get(url, config)
      .then( res => {
        $log.log('success', res.data);
        return setToken(res.data);
      })
      .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
      });
  };

  return service;
}
