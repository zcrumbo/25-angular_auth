'use strict';

module.exports = function (){
  return {
    restrict: 'EAC',
    template: require('./social-icons.html'),
    controller: ['$log', SocialIconController],
    bindToController: true,
    controllerAs: 'socialIconCtrl',
    scope: {
      tagTitle: '@'
    }
  };
};

function SocialIconController() {
  this.icons = [
    {
      val:'facebook',
      url: 'http://www.facebook.com'
    },
    {
      val: 'twitter',
      url:'http://www.twitter.com'
    },
    {
      val:'instagram',
      url: 'http://www.instagram.com'
    }
  ];
}