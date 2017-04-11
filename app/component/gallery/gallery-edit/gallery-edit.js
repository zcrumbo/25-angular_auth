'use strict';

require('./_gallery-edit.scss');

module.exports = {
  template: require('./gallery-edit.html'),
  controller: ['$log', 'galleryService', GalleryEditController],
  controllerAs: 'galleryEditCtrl',
  bindings: {
    gallery: '=',
    showEditGallery: '=',
    oldData: '<'
  }
};

function GalleryEditController($log, galleryService) {
  $log.debug('GalleryEditController');
  $log.debug(this.oldData, this);

  this.cancelUpdate = function() {
    $log.debug(this.gallery);
    this.gallery = this.oldData;
    this.showEditGallery = false;
  };

  this.updateGallery = function() {
    $log.debug('GalleryEditController.updateGallery');
    galleryService.updateGallery(this.gallery._id, this.gallery);
    this.showEditGallery = false;
  };
}
