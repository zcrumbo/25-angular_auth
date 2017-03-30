'use strict';

require('./_home.scss');

module.exports = ['$log','$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService) {
  $log.debug('HomeController');

  this.galleries = [];

  this.fetchGalleries = function() {
    galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
    });
  };

  this.deleteGallery = function(gallery) {
    galleryService.deleteGallery(gallery)
    .then( _gallery => {
      $log.debug('gallery deleted:', _gallery );
    })
    .catch( err => {
      $log.error( err);
    });
  };

  this.fetchGalleries();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });
}