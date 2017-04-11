'use strict';

require('./_thumbnail-modal.scss');

module.exports = {
  template: require('./thumbnail-modal.html'),
  controller: ['$log',   thumbnailModalController],
  controllerAs: 'thumbnailModalCtrl',
  bindings: {
    resolve: '<',
  }
};

function thumbnailModalController($log){
  $log.debug('thumbnailModalController');

}