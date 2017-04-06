'use strict';

describe('Gallery Edit Controller', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });
  describe('galleryEditCtrl.cancelUpdate', () => {
    it('should cancel a pending update and restore existing data',()  => {
      let mockBindings = {
        gallery: {},
        oldData: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: [],
        },
        showEditGallery: true
      };
      let galleryEditCtrl = this.$componentController('galleryEdit', null, mockBindings);

      galleryEditCtrl.cancelUpdate();

      expect(galleryEditCtrl.showEditGallery).toEqual(false);
      expect(galleryEditCtrl.gallery).toEqual(mockBindings.oldData);

      this.$rootScope.$apply();
    });
  });
  describe('galleryEditCtrl.updateGallery', () => {
    it('should update a gallery', () => {
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'updated name',
          desc: 'updated desc',
          pics: []
        },
        showEditGallery: true
      };

      let url = 'http://localhost:8000/api/gallery/12345';
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer test token',
      };

      let galleryEditCtrl = this.$componentController('galleryEdit', null, mockBindings);

      this.$httpBackend.expectPUT(url, galleryEditCtrl.gallery, headers)
      .respond(200, {
        _id: '12345',
        username: 'testuser',
        name: mockBindings.gallery.name,
        desc: mockBindings.gallery.desc,
        pics: []
      });

      galleryEditCtrl.updateGallery();
      expect(galleryEditCtrl.showEditGallery).toEqual(false);

      this.$httpBackend.flush();
      this.$rootScope.$apply();

    });
  });
});



