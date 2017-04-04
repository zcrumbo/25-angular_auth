'use strict';

require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', thumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
    gallery: '<'
  }
};

function thumbnailController($log, picService){
  $log.debug('thumbnailController');

  this.deleteGalleryPic = function(){
    console.log('deletePic');

    picService.deleteGalleryPic(this.gallery, this.pic);
  };

}