'use strict';

require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log',  '$uibModal',  '$document', 'picService', thumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
    gallery: '<'
  }
};

function thumbnailController($log,$uibModal, $document, picService){
  $log.debug('thumbnailController');

  this.deleteGalleryPic = function(){
    console.log('deletePic');

    picService.deleteGalleryPic(this.gallery, this.pic);
  };
  this.open = () => {
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'thumbnailModal',
      size: 'lg',
      resolve: {
        modalData:  this.pic
      }
    }).result.then(()=>{}).catch( () => $log.log('closed'));


  };

}