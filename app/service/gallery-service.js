'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService');

  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery){
    $log.debug('galleryService.createGallery');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, gallery, config);
    })
    .then( res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleries = function (galleryID) {
    $log.debug('galleryService.deleteGalleries');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
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

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('galleries retrieved');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGalleries = function (galleryID, galleryData) {
    $log.debug('galleryService.updateGalleries');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };

      return $http.put(url, galleryData, config);
    })
    .then( res => {
      for (let i=0; i < service.galleries.length; i++){
        let current = service.galleries[i];
        if (current._id === galleryID){
          service.galleries[i] = res.data;
          break;
        }
      }

      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  service.deleteGallery = function(galleryID){
    $log.debug('galleryService.deleteGallery');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Beare ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      for (let i=0; i <service.galleries.length; i++){
        let current = service.galleries[i];
        if (current._id === galleryID){
          service.galleries.splice(i,1);
          break;
        }
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}
