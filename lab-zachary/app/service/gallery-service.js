'use strict';

module.exports = ['$log', '$q', '$http', 'authService', galleryService];

function galleryService($log, $q, $http, authService) {
  $log.debug('galleryService');

  let service = {};
  service.galleries = [];
  let url = `${__API_URL__}`;

  service.fetchGalleries = function(){
    $log.debug('authService.fetchGallery');

    return authService.getToken()
    .then( token => {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };
      return $http.get(`${url}/api/gallery`, config)
      .then( res => {
        $log.debug('galleries retrieved', res.data);

        service.galleries = res.data;
        return service.galleries;
      })
      .catch( err => {
        return $q.reject(err);
      });
    });


  };

  service.createGallery = function(gallery) {
    $log.debug('authService.createGallery');

    return authService.getToken()
    .then( token => {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      return $http.post(`${url}/api/gallery`, gallery, config);
    })
    .then( res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err);
      return $q.reject(err);
    });
  };

  service.updateGallery = function(gallery) {
    $log.debug('galleryService.updateGallery', gallery);

    return authService.getToken()
    .then( token => {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      return $http.put(`${url}/api/gallery/${gallery._id}`, gallery, config);
    })
    .then( res => {
      $log.log('gallery updated:', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(gallery) {
    $log.debug('authService.deleteGallery');

    return authService.getToken()
    .then( token => {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      return $http.delete(`${url}/api/gallery/${gallery}`, config);
    })
    .then( res => {
      $log.debug('gallery deleted');
      service.galleries.forEach( (_gallery, index) => {
        if (_gallery._id === gallery) service.galleries.splice(index,1);
      });
      return res.data;
    })
    .catch( err => {
      $log.error(err);
      return $q.reject(err);
    });
  };

  return service;
}