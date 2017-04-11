'use strict';

require('./_gallery-item.scss');

module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log',  'galleryService', GalleryItemController],
  controllerAs: 'galleryItemCtrl',
  bindings: {
    gallery: '<',
    deleteDone: '&'
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
    .then( () => {
      $log.debug('gallery deleted:', this.currentGallery );
      this.deleteDone(this.gallery);
    })
    .catch( err => {
      $log.error( err);
    });
    return(this.gallery);
  };

}