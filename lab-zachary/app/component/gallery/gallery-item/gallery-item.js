'use strict';

require('./_gallery-item.scss');

module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log',  'galleryService', GalleryItemController],
  controllerAs: 'galleryItemCtrl',
  bindings: {
    gallery: '<',
    currentGallery: '=',
    deleteDone: '&'
  }
};

function GalleryItemController($log, galleryService) {
  $log.debug('GalleryItemController');
  this.showEditGallery = false;
  this.currentGallery = 'test';

  this.editGallery = function() {
    this.oldData = angular.copy(this.gallery);
    this.showEditGallery = true;
  };

  this.deleteGallery = () => {
    galleryService.deleteGallery(this.gallery._id)
    .then( () => {
      $log.debug('gallery deleted:', this.currentGallery );
      this.deleteDone();
    })
    .catch( err => {
      $log.error( err);
    });
  };

}