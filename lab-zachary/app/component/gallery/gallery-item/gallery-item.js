'use strict';

require('./_gallery-item.scss');

module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log', 'galleryService', GalleryItemController],
  controllerAs: 'galleryItemCtrl',
  bindings: {
    gallery: '<',
    oldData: '<',
  }
};

function GalleryItemController($log, galleryService) {
  $log.debug('GalleryItemController');
  this.showEditGallery = false;

  this.editGallery = function() {
    this.oldData = angular.copy(this.gallery);
    this.showEditGallery = true;
  };

  this.deleteGallery = function() {
    galleryService.deleteGallery(this.gallery._id)
    .then( _gallery => {
      $log.debug('gallery deleted:', _gallery );
    })
    .catch( err => {
      $log.error( err);
    });
  };


}