'use strict';

require('./_gallery-edit.scss');

module.exports = {
  template: require('./gallery-edit.html'),
  controller: ['$log', 'galleryService', GalleryEditController],
  controllerAs: 'galleryEditCtrl',
  bindings: {
    gallery: '<'
  }
};

function GalleryEditController($log, galleryService) {
  $log.debug('GalleryEditController');

  this.updateGallery = function() {
    $log.debug('GalleryEditController.updateGallery');
    galleryService.updateGallery(this.gallery._id, this.gallery)
    .then( _gallery => {
      $log.debug('gallery updated', _gallery);
    })
    .catch( err => {
      $log.error(err);
    });
  };
}
