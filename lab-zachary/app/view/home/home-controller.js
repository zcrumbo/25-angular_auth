'use strict';

require('./_home.scss');

module.exports = ['$log','$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService) {
  $log.debug('HomeController');

  this.galleries = [];
  this.sort = this.sort || {
    name: 'oldest',
    val: false
  };

  this.fetchGalleries = function() {
    galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
      this.currentGallery = galleries[0];
    });
  };

  this.galleryDeleteDone = function(gallery) {
    if (this.currentGallery._id === gallery._id) {
      this.currentGallery = null;
    }
  };
  this.changeSort = () => {
    $log.log(this.sort);
    if (this.sort.val===true) {
      this.sort.name = 'oldest';
      this.sort.val =false;
      return this.sort;
    }
    if (this.sort.val===false) {
      this.sort.name = 'newest';
      this.sort.val =true;
    }
    return this.sort;
  };


  this.fetchGalleries();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });
}