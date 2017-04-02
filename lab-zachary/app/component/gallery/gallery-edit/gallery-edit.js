'use strict';

require('./_gallery-edit.scss');

module.exports = {
  template: require('./gallery-edit.html'),
  controller: ['$log', 'galleryService', GalleryEditController],
  controllerAs: 'galleryEditCtrl',
  bindings: {
    gallery: '<',
    showEditGallery: '='
  }
};

function GalleryEditController($log, galleryService) {
  $log.debug('GalleryEditController');
  this.galleries = galleryService.galleries;
  this.cancelUpdate = function() {
    this.showEditGallery = false;
    galleryService.fetchGalleries()
    .then( oGalleries => {
      oGalleries.forEach( (_gallery, index) => {
        if (_gallery._id === this.gallery._id) this.galleries[index] = _gallery;
      });
    })
    .catch( err => {
      $log.error(err);
    });
  };
  this.updateGallery = function() {
    $log.debug('GalleryEditController.updateGallery');
    galleryService.updateGallery(this.gallery._id, this.gallery)
    .then( () => {
      this.showEditGallery = false;
    })
    .catch( err => {
      $log.error(err);
    });
  };
}
